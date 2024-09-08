import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.scss'
})
export class AddEditCategoryComponent {
  categoryForm: FormGroup;
  categories: any = [];
  categoryId: number = 0;
  isEditMode = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private categoryService: CategoryService,  private route: Router, private activatedRoute: ActivatedRoute) {
    this.categoryForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.categoryId = Number(this.activatedRoute.snapshot.params["id"]);
    if (this.categoryId > 0) {
      this.getCategoryById(this.categoryId);
      this.isEditMode = true;
    }
  }

  getCategoryById(id: number) {
    this.categoryService.getCategoryById(id).subscribe(
      {
        next: res => {
          let category = res;
          this.categoryForm.patchValue({
            name: category?.name,
            description: category?.description
          });
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  onSubmit() {
    if (this.categoryForm?.valid) {
      if (this.isEditMode) {
        this.updateCategory(this.categoryForm.value);
      } else {
        this.addCategory(this.categoryForm.value);
      }
      
    }
  }

  cancelEdit(): any {
    this.route.navigate(['category']);
  }

  addCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(
      {
        next: res => {
          if (res) {
            console.log('Added successfully');
            this.categoryForm.reset();
            this.route.navigate(['category']);
          } else {
            console.log('Failed to Add category');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  updateCategory(category: Category) {
    category.id = this.categoryId;
    this.categoryService.updateCategory(category).subscribe(
      {
        next: res => {
          if (res) {
            console.log('Updated successfully');
            this.categoryForm.reset();
            this.route.navigate(['category']);
          } else {
            console.log('Failed to Update category');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }
}
