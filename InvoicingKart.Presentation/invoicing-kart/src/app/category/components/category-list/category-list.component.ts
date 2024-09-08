import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private route: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      {
        next: res => {
          this.categories = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  onEditCategory(category: any): any {
    this.route.navigate(['category/' + category?.id]);
  }

  onDeleteCategory(category: any): any {
    this.categoryService.deleteCategory(category?.id).subscribe(
      {
        next: res => {
          // can be shown in any of the dialog
          if (res) {
            console.log('Deleted successfully');
            this.getCategories();
          } else {
            console.log('Failed to Delete category');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  addCategory(): any {
    this.route.navigate(['category/' + 0]);
  }
}
