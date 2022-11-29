import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { map } from 'rxjs';
import {
  MediaTypeOptions,
  TimeWindowOptions,
} from 'src/app/interfaces/db-interfaces';
import { DeviceType } from 'src/app/interfaces/shared';
import { DbService } from 'src/app/services/db.service';
import { DeviceTypeService } from 'src/app/services/device-type.service';
import { environment } from 'src/environments/environment';

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

  imageBaseUrl: string = environment.images;

  constructor(
    private dbService: DbService,
    private loadingCtrl: LoadingController,
    private deviceType: DeviceTypeService
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

    document.getElementById('block')!.click();
    console.log(document.getElementById('block')?.click());
  }

  get timeWindow(): TimeWindowOptions {
    return this._timeWindow;
  }

  set timeWindow(newTimeWindow: TimeWindowOptions) {
    this._timeWindow = newTimeWindow;

    this.items = [];
    this.loadItems();

    document.getElementById('block')!.click();
  }

  async loadItems(infiniteScrollEvent?: any): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.dbService
      .getTrending(this.mediaType, this.timeWindow, this.currentPage)
      .pipe(this.attachImagesUrl())
      .subscribe({
        next: (response: any) => {
          this.items.push(...response.results);

          loading.dismiss();

          if (infiniteScrollEvent) {
            infiniteScrollEvent?.target.complete();
            infiniteScrollEvent.target.disabled =
              response.total_pages === this.currentPage;
          }
        },
      });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadItems(event);
  }

  attachImagesUrl() {
    const imgSize =
      this.deviceType.device.device === 'desktop' ? 'w342' : 'w154';

    return map((response: any) => ({
      ...response,
      results: response.results.map((item: any) => ({
        ...item,
        poster_path: `${this.imageBaseUrl}/${imgSize}${item.poster_path}`,
      })),
    }));
  }

  updateMediaType(event: any) {
    this.mediaType = { media_type: event.target.value };
  }

  updateTimeWindow(event: any) {
    this.timeWindow = { time_window: event.target.value };
  }
}
