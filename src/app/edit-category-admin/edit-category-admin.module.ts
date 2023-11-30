import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCategoryAdminPageRoutingModule } from './edit-category-admin-routing.module';

import { EditCategoryAdminPage } from './edit-category-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCategoryAdminPageRoutingModule
  ],
  declarations: [EditCategoryAdminPage]
})
export class EditCategoryAdminPageModule {}
