import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponentComponent } from './shared/layout/layout-component.component';

export const routes: Routes = [
  {
      path: '',
      component: LayoutComponentComponent,
      children: [
          {
              path: 'products',
              loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
          },
          {
            path: 'category',
            loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
          },
          {
            path: 'customer',
            loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
          },
          {
            path: 'purchase',
            loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)
          }
      ]
  },
  { path: '**', component: LayoutComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
