import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemListModule } from './item-list/item-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule, ItemListModule],
  exports: [ItemListModule],
})
export class SharedModule {}
