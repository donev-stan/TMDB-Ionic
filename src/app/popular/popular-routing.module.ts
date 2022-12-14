import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopularPage } from './popular.page';

const routes: Routes = [
  {
    path: '',
    component: PopularPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularPageRoutingModule {}
