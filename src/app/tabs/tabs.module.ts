import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { MenuPageModule } from '../menu/menu.module';
import { RouterModule, RouterOutlet } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    MenuPageModule,
    RouterModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
