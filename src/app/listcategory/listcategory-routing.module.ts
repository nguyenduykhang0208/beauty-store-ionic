import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcategoryPage } from './listcategory.page';

const routes: Routes = [
  {
    path: '',
    component: ListcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListcategoryPageRoutingModule {}
