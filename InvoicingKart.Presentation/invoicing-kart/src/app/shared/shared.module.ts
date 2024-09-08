import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponentComponent } from './layout/layout-component.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedRoutingModule } from './shared-router.module';

const components = [LayoutComponentComponent, HeaderComponent, FooterComponent]
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule
  ],
  exports: [
    components
  ]
})
export class SharedModule { }
