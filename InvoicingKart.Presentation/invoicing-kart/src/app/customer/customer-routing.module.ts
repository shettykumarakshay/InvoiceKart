import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddEditCustomerComponent } from './components/add-edit-customer/add-edit-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

export const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent,
    },
    {
        path: ':id',
        component: AddEditCustomerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}