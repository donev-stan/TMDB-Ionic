import { Component, OnInit } from '@angular/core';
import { MediaTypeOptions } from '../shared/interfaces/db-interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  items: any[] = [];
  currentPage: number = 1;
  private _mediaType: MediaTypeOptions = { media_type: 'movie' };

  get mediaType(): MediaTypeOptions {
    return this._mediaType;
  }

  set mediaType(newMediaType: MediaTypeOptions) {
    this._mediaType = newMediaType;

    this.items = [];
    // this.loadItems();
  }

  constructor() {}

  ngOnInit() {}

  updateMediaType(event: any) {
    this.mediaType = { media_type: event.target.value };
  }
}
