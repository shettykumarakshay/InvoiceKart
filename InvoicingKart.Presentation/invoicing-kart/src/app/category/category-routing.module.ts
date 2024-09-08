import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';

export const routes: Routes = [
    {
        path: '',
        component: CategoryListComponent,
    },
    {
        path: ':id',
        component: AddEditCategoryComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {}