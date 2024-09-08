import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrl: './add-edit-customer.component.scss'
})
export class AddEditCustomerComponent {
  customerForm: FormGroup;
  customers: any = [];
  customerId: number = 0;
  isEditMode = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService,  private route: Router, private activatedRoute: ActivatedRoute) {
    this.customerForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
    this.customerId = Number(this.activatedRoute.snapshot.params["id"]);
    if (this.customerId > 0) {
      this.getCustomerById(this.customerId);
      this.isEditMode = true;
    }
  }

  getCustomerById(id: number) {
    this.customerService.getCustomerById(id).subscribe(
      {
        next: res => {
          let customer = res;
          this.customerForm.patchValue({
            name: customer?.name,
            email: customer?.email,
            address: customer?.address,
            contactNumber: customer?.contactNumber
          });
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  onSubmit() {
    if (this.customerForm?.valid) {
      if (this.isEditMode) {
        this.updateCustomer(this.customerForm.value);
      } else {
        this.addCustomer(this.customerForm.value);
      }
      
    }
  }

  cancelEdit(): any {
    this.route.navigate(['customer']);
  }

  addCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe(
      {
        next: res => {
          if (res) {
            console.log('Added successfully');
            this.customerForm.reset();
            this.route.navigate(['customer']);
          } else {
            console.log('Failed to Add customer');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  updateCustomer(customer: Customer) {
    customer.id = this.customerId;
    this.customerService.updateCustomer(customer).subscribe(
      {
        next: res => {
          if (res) {
            console.log('Updated successfully');
            this.customerForm.reset();
            this.route.navigate(['customer']);
          } else {
            console.log('Failed to Update customer');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }
}
