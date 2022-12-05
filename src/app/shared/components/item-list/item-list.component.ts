import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceTypeService } from '../../services/device-type.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items!: any;
  @Output() loadMoreItems: Subject<any> = new Subject();

  constructor(public deviceType: DeviceTypeService) {}

  ngOnInit() {}

  loadMore(event: any) {
    this.loadMoreItems.next(event);
  }
}
