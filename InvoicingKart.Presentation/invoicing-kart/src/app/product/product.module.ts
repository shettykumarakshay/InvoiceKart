import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product-list/product.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

@NgModule({
  declarations: [ProductComponent, AddEditProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
