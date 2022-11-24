import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs';
import {
  MediaTypeOptions,
  TimeWindowOptions,
} from 'src/app/interfaces/db-interfaces';
import { DbService } from 'src/app/services/db.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trending',
  templateUrl: 'trending.page.html',
  styleUrls: ['trending.page.scss'],
})
export class TrendingPage implements OnInit {
  items: any[] = [];

  mediaType: MediaTypeOptions = { media_type: 'all' };
  timeWindow: TimeWindowOptions = { time_window: 'week' };
  currentPage: number = 1;

  imageBaseUrl: string = environment.images;

  constructor(
    private dbService: DbService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
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
      .pipe(this.attachImagesUrl())
      .subscribe({
        next: (response: any) => {
          this.items.push(...response.results);

          // console.log(response);
          // console.log(this.items);

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
    return map((response: any) => ({
      ...response,
      results: response.results.map((result: any) => ({
        ...result,
        poster_path: `${this.imageBaseUrl}/w92${result.poster_path}`,
      })),
    }));
  }
}
