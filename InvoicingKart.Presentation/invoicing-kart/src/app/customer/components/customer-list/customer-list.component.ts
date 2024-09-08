import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private route: Router) {
  }

  ngOnInit() {
    this.getCustomers();
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

  onEditCustomer(customer: any): any {
    this.route.navigate(['customer/' + customer?.id]);
  }

  onDeleteCustomer(customer: any): any {
    this.customerService.deleteCustomer(customer?.id).subscribe(
      {
        next: res => {
          // can be shown in any of the dialog
          if (res) {
            console.log('Deleted successfully');
            this.getCustomers();
          } else {
            console.log('Failed to Delete customer');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  addCustomer(): any {
    this.route.navigate(['customer/' + 0]);
  }
}
