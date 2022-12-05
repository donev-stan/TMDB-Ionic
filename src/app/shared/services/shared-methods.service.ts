import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MediaTypeOptions } from '../interfaces/db-interfaces';
import { Genres } from '../interfaces/shared';
import { DbService } from './db.service';
import { DeviceTypeService } from './device-type.service';

@Injectable({
  providedIn: 'root',
})
export class SharedMethodsService {
  imageBaseUrl: string = environment.images;

  constructor(
    private dbService: DbService,
    private deviceType: DeviceTypeService
  ) {}

  attachImagesUrl() {
    const imgSize =
      this.deviceType.device.device === 'desktop' ? 'w342' : 'w92';

    return map((response: any) => ({
      ...response,
      results: response.results.map((item: any) => ({
        ...item,
        poster_path: `${this.imageBaseUrl}/${imgSize}${item.poster_path}`,
      })),
    }));
  }

  attachGenres(media_type?: MediaTypeOptions) {
    return map((response: any) => ({
      ...response,
      results: response.results.map((item: any) => ({
        ...item,
        genres: this.defineGenreNames(
          item.genre_ids,
          media_type ? media_type : item.media_type
        ),
      })),
    }));
  }

  defineGenreNames(arrayOfGenres: any, media_type: MediaTypeOptions): string[] {
    console.log(arrayOfGenres);

    console.log(media_type);

    return arrayOfGenres.flatMap((genreId: Genres) => {
      if (media_type == ('tv' as unknown as MediaTypeOptions)) {
        return this.dbService.tvGenres.filter(
          (tvGenres: any) => tvGenres.id === genreId
        );
      } else if (media_type == ('movie' as unknown as MediaTypeOptions)) {
        return this.dbService.movieGenres.filter(
          (movieGenres: any) => movieGenres.id === genreId
        );
      }
    });
  }
}
