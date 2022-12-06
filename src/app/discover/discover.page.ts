import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { tap } from 'rxjs';
import { MediaTypeOptions } from '../shared/interfaces/db-interfaces';
import { DbService } from '../shared/services/db.service';
import { SharedMethodsService } from '../shared/services/shared-methods.service';

import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
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
      .discover(this.mediaType, this.currentPage)
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

  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
    }
  }
}
