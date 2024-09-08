import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product-list/product.component';
import { NgModule } from '@angular/core';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
    },
    {
        path: ':id',
        component: AddEditProductComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}