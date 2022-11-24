import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-trending',
  templateUrl: 'trending.page.html',
  styleUrls: ['trending.page.scss'],
})
export class TrendingPage implements OnInit {
  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getTrending().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
