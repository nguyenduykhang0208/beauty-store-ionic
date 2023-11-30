import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCategoryAdminPage } from './edit-category-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EditCategoryAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCategoryAdminPageRoutingModule {}
