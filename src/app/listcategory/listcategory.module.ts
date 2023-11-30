import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListcategoryPageRoutingModule } from './listcategory-routing.module';

import { ListcategoryPage } from './listcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListcategoryPageRoutingModule
  ],
  declarations: [ListcategoryPage]
})
export class ListcategoryPageModule {}
