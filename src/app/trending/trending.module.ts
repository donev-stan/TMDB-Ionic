import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrendingPage } from './trending.page';

import { TrendingPageRoutingModule } from './trending-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TrendingPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [TrendingPage],
})
export class TrendingPageModule {}
