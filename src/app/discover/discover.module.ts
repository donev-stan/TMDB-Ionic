import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [DiscoverPage],
})
export class DiscoverPageModule {}
