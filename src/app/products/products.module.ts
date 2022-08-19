import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist/productlist.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    ProductlistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ProductsModule { }
