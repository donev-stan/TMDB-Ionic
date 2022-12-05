import { Component } from '@angular/core';
import { DeviceTypeService } from './shared/services/device-type.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public deviceType: DeviceTypeService) {}
}
