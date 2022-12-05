import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopularPage } from './popular.page';

import { PopularPageRoutingModule } from './popular-routing.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PopularPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [PopularPage],
})
export class PopularPageModule {}
