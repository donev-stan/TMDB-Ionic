import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from './item-list.component';

@NgModule({
  declarations: [ItemListComponent],
  imports: [CommonModule, IonicModule],
  exports: [ItemListComponent],
})
export class ItemListModule {}
