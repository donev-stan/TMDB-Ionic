import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { map, tap } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import { environment } from 'src/environments/environment';
import { MediaTypeOptions } from '../shared/interfaces/db-interfaces';
import { Genres } from '../shared/interfaces/shared';
import { DeviceTypeService } from '../shared/services/device-type.service';
import { SharedMethodsService } from '../shared/services/shared-methods.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: 'top-rated.page.html',
  styleUrls: ['top-rated.page.scss'],
})
export class TopRatedPage {
  items: any[] = [];
  currentPage: number = 1;

  private _mediaType: MediaTypeOptions = { media_type: 'movie' };

  get mediaType(): MediaTypeOptions {
    return this._mediaType;
  }

  set mediaType(newMediaType: MediaTypeOptions) {
    this._mediaType = newMediaType;

    this.items = [];
    this.loadItems();
  }

  constructor(
    private dbService: DbService,
    private loadingCtrl: LoadingController,
    private helpers: SharedMethodsService
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
      .getTopRated(this.mediaType, this.currentPage)
      .pipe(
        this.helpers.attachImagesUrl(),
        this.helpers.attachGenres(
          this.mediaType.media_type as unknown as MediaTypeOptions
        ),
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
}
