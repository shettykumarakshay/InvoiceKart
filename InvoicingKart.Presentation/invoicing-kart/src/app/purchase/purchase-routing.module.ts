import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PurchaseComponent } from './components/purchase/purchase.component';

export const routes: Routes = [
    {
        path: '',
        component: PurchaseComponent,
    },
    // {
    //     path: ':id',
    //     component: AddEditProductComponent,
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseRoutingModule {}