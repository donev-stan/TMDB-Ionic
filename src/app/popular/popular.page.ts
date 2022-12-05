import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { tap } from 'rxjs';
import { MediaTypeOptions } from '../shared/interfaces/db-interfaces';
import { DbService } from '../shared/services/db.service';
import { SharedMethodsService } from '../shared/services/shared-methods.service';

@Component({
  selector: 'app-popular',
  templateUrl: 'popular.page.html',
  styleUrls: ['popular.page.scss'],
})
export class PopularPage {
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
      .getPopular(this.mediaType, this.currentPage)
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
