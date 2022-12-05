import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { tap } from 'rxjs';
import {
  MediaTypeOptions,
  TimeWindowOptions,
} from 'src/app/shared/interfaces/db-interfaces';
import { DbService } from 'src/app/shared/services/db.service';
import { SharedMethodsService } from '../shared/services/shared-methods.service';

@Component({
  selector: 'app-trending',
  templateUrl: 'trending.page.html',
  styleUrls: ['trending.page.scss'],
})
export class TrendingPage implements OnInit {
  items: any[] = [];

  private _mediaType: MediaTypeOptions = { media_type: 'all' };
  private _timeWindow: TimeWindowOptions = { time_window: 'week' };
  currentPage: number = 1;

  constructor(
    private dbService: DbService,
    private loadingCtrl: LoadingController,
    private helpers: SharedMethodsService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  get mediaType(): MediaTypeOptions {
    return this._mediaType;
  }

  set mediaType(newMediaType: MediaTypeOptions) {
    this._mediaType = newMediaType;

    this.items = [];
    this.loadItems();
  }

  get timeWindow(): TimeWindowOptions {
    return this._timeWindow;
  }

  set timeWindow(newTimeWindow: TimeWindowOptions) {
    this._timeWindow = newTimeWindow;

    this.items = [];
    this.loadItems();
  }

  async loadItems(infiniteScrollEvent?: any): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.dbService
      .getTrending(this.mediaType, this.timeWindow, this.currentPage)
      .pipe(
        this.helpers.attachImagesUrl(),
        this.helpers.attachGenres(),
        tap((data) => console.log(data))
      )
      .subscribe({
        next: (response: any) => {
          this.items.push(...response.results);

          loading.dismiss();

          if (infiniteScrollEvent) {
            infiniteScrollEvent?.target.complete();
            infiniteScrollEvent.target.disabled =
              response.total_pages === this.currentPage;
          }

          console.log(this.dbService.movieGenres);
          console.log(this.dbService.tvGenres);
        },
      });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadItems(event);
  }

  updateMediaType(event: any) {
    this.mediaType = { media_type: event.target.value };
  }

  updateTimeWindow(event: any) {
    this.timeWindow = { time_window: event.target.value };
  }
}
