import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListPage } from './components/movie-list/movie-list.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MovieListPage],
  imports: [CommonModule, IonicModule],
  exports: [MovieListPage],
})
export class SharedModule {}
