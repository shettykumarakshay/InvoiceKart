import { Component } from '@angular/core';
import { Product } from '../../../product/models/product';
import { ProductService } from '../../../product/services/product.service';
import { CustomerService } from '../../../customer/services/customer.service';
import { Customer } from '../../../customer/models/customer';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../models/cart-item';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  products: Product[] = [];
  cart: CartItem[] = [];
  customerId: number = 0;
  customers: Customer[] = [];
  customer: Customer | null = null;
  showProducts = false;
  faShoppingCart = faShoppingCart;
  invoice: Invoice | null = null;
  paymentMethods = ['Credit Card', 'Paypal', 'Cash'];
  selectedPaymentMethod: string = '';
  flatDiscount: number = 0;  // Flat discount applied to the total purchase
  taxRate: number = 0.1;  // 10% tax rate
  showPayment = false;

  constructor(private productService: ProductService, private customerService: CustomerService) {}

  ngOnInit() {
    this.getCustomers();
    this.getProducts();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      {
        next: res => {
          this.customers = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      {
        next: res => {
          this.products = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  onCustomerChange(data: any): any {
    this.cart = [];
    if (this.customerId > 0) {
      this.showProducts = true;
    } else {
      this.showProducts = false;
    }
  }

  // Method to add products to cart
  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  getCartCount(): any {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Show Add to cart if only if stock is available
  showAddCart(product: Product): boolean {
    const existingItem = this.cart.find(item => item.product.id === product.id) ?? null;
    if (existingItem) {
      return product?.quantity > existingItem.quantity;
    } else {
      return product?.quantity > 0;
    }
  }

// Show Remove Cart if product is added to cart
  removeFromCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity -= 1;
    }
  }

  showRemoveCart(product: Product): boolean {
    const existingItem = this.cart.find(item => item.product.id === product.id) ?? null;
    if (existingItem) {
      return existingItem.quantity > 0;
    } else {
      return false;
    }
  }

  placeOrder(): any {
    this.showPayment = true;
  }

   // Method to calculate total amount (includes discounts and taxes)
   calculateTotalAmount(): number {
    let total = 0;
    this.cart.forEach(item => {
      const productTotal = item.product.price * item.quantity;
      const productDiscount = (item.product.discount ?? 0 / 100) * productTotal;
      total += (productTotal - productDiscount); 
    });
    const flatDiscount = (this.flatDiscount / 100) * total;
    total -= flatDiscount;

    const tax = total * this.taxRate;
    return total + tax;
  }

  // Method to generate the invoice
  generateInvoice() {
    this.showPayment = false;
    let totalAmount = this.calculateTotalAmount();
    this.flatDiscount = this.getFlatDiscount(totalAmount);
    this.customer = this.customers.find(x => x.id == this.customerId) ?? { id: 0, name:'', email: '', contactNumber: '', address: ''};
    this.invoice = {
      customer: this.customer,
      items: this.cart,
      totalAmount: totalAmount,
      discount: this.flatDiscount,
      tax: this.taxRate * 100,
      paymentMethod: this.selectedPaymentMethod
    };
  }

  // Logic for adding flat discount based on total amount
  getFlatDiscount(totalAmount: number) : number {
    if (totalAmount > 1000 && totalAmount < 2000) {
        return 10;
    } else if (totalAmount > 2000 && totalAmount < 5000) {
      return 20;
    } else if (totalAmount > 5000 ) {
      return 50;
    }

    return 0
  }

  backToplaceOrder(): any{
    this.invoice = null;
  }

}
