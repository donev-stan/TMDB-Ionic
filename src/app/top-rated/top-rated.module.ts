import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopRatedPage } from './top-rated.page';

import { TopRatedPageRoutingModule } from './top-rated-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TopRatedPageRoutingModule,
    SharedModule,
  ],
  declarations: [TopRatedPage],
})
export class TopRatedPageModule {}
