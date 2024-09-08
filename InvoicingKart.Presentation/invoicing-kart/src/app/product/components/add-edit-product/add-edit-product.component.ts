import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../category/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent {
  productForm: FormGroup;
  categories: any = [];
  productId: number = 0;
  isEditMode = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService,  private route: Router, private activatedRoute: ActivatedRoute) {
    this.productForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categoryId: ['', Validators.required],
      discount: [ 0, Validators.required]
    });
    this.getCategories();
    this.productId = Number(this.activatedRoute.snapshot.params["id"]);
  }

  async getCategories(): Promise<any> {
    try {
      const response = await firstValueFrom(this.categoryService.getCategories());
      this.categories = response;
      if (this.productId > 0) {
        this.isEditMode = true;
        this.getProductById(this.productId);
      }
    } catch (error) {
      console.error('Error fetching categories', error);
      throw error;
    }
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      {
        next: res => {
          let product = res;
          this.productForm.patchValue({
            name: product?.name,
            description: product?.description,
            price: product?.price,
            quantity: product?.quantity,
            discount: product?.discount,
            categoryId: product.categoryId
          });
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  onSubmit() {
    if (this.productForm?.valid) {
      if (this.isEditMode) {
        this.updateProduct(this.productForm.value);
      } else {
        this.addProduct(this.productForm.value);
      }
      
    }
  }

  cancelEdit(): any {
    this.route.navigate(['products']);
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(
      {
        next: res => {
          if (res) {
            console.log('Added successfully');
            this.productForm.reset();
            this.route.navigate(['products']);
          } else {
            console.log('Failed to Add product');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  updateProduct(product: Product) {
    product.id = this.productId;
    this.productService.updateProduct(product).subscribe(
      {
        next: res => {
          if (res) {
            console.log('Updated successfully');
            this.productForm.reset();
            this.route.navigate(['products']);
          } else {
            console.log('Failed to Update product');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }
}
