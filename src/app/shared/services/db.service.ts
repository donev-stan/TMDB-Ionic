import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  MediaTypeOptions,
  TimeWindowOptions,
} from '../interfaces/db-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private params = new HttpParams()
    .set('api_key', environment.apiKey)
    .set('language', 'en-US');

  private _movieGenres!: any;
  private _tvGenres!: any;

  constructor(private http: HttpClient) {
    this.getGenres({ media_type: 'movie' }).subscribe(
      (response) => (this.movieGenres = response.genres)
    );
    this.getGenres({ media_type: 'tv' }).subscribe(
      (response) => (this.tvGenres = response.genres)
    );
  }

  set movieGenres(genres: any) {
    this._movieGenres = genres;
  }

  get movieGenres(): any {
    return this._movieGenres;
  }

  set tvGenres(genres: any) {
    this._tvGenres = genres;
  }

  get tvGenres(): any {
    return this._tvGenres;
  }

  getTrending(
    media_type: MediaTypeOptions = { media_type: 'all' },
    time_window: TimeWindowOptions = { time_window: 'week' },
    page: number = 1
  ): Observable<any> {
    const url = `${environment.baseUrl}/trending/${media_type.media_type}/${time_window.time_window}`;
    const params = this.params.append('page', page);

    return this.http.get(url, { params });
  }

  getTopRated(
    media_type: MediaTypeOptions = { media_type: 'movie' },
    page: number = 1
  ): Observable<any> {
    const url = `${environment.baseUrl}/${media_type.media_type}/top_rated`;
    const params = this.params.append('page', page);

    return this.http.get(url, { params });
  }

  getPopular(
    media_type: MediaTypeOptions = { media_type: 'movie' },
    page: number = 1
  ): Observable<any> {
    const url = `${environment.baseUrl}/${media_type.media_type}/popular`;
    const params = this.params.append('page', page);

    return this.http.get(url, { params });
  }

  getGenres(media_type: MediaTypeOptions): Observable<any> {
    const url = `${environment.baseUrl}/genre/${media_type.media_type}/list`;

    return this.http.get(url, { params: this.params });
  }

  discover(
    media_type: MediaTypeOptions = { media_type: 'movie' },
    page: number = 1
  ): Observable<any> {
    const url = `${environment.baseUrl}/discover/${media_type.media_type}`;
    const params = this.params.append('page', page);

    return this.http.get(url, { params });
  }
}
