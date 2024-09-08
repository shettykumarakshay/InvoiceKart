import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private route: Router) {
  }

  ngOnInit() {
    this.getProducts();
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

  onEditProduct(product: any): any {
    this.route.navigate(['products/' + product?.id]);
  }

  onDeleteProduct(product: any): any {
    this.productService.deleteProduct(product?.id).subscribe(
      {
        next: res => {
          // can be shown in any of the dialog
          if (res) {
            console.log('Deleted successfully');
            this.getProducts();
          } else {
            console.log('Failed to Delete product');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  addProduct(): any {
    this.route.navigate(['products/' + 0]);
  }
}
