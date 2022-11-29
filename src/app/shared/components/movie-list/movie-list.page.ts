import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceTypeService } from 'src/app/services/device-type.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {
  @Input() items!: any;
  @Output() loadMoreItems: Subject<any> = new Subject();

  constructor(public deviceType: DeviceTypeService) {}

  ngOnInit() {}

  loadMore(event: any) {
    this.loadMoreItems.next(event);
  }
}
