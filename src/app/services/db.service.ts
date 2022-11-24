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

  constructor(private http: HttpClient) {}

  getTrending(
    media_type: MediaTypeOptions = { media_type: 'all' },
    time_window: TimeWindowOptions = { time_window: 'week' },
    page: number = 1
  ): Observable<any> {
    const url = `${environment.baseUrl}/trending/${media_type.media_type}/${time_window.time_window}`;
    const params = this.params.append('page', page);

    return this.http.get(url, { params });
  }

  getGenres(media_type: MediaTypeOptions = { media_type: 'all' }) {}
}
