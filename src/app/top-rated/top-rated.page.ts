import { Component } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: 'top-rated.page.html',
  styleUrls: ['top-rated.page.scss'],
})
export class TopRatedPage {
  constructor(private dbService: DbService) {}
}
