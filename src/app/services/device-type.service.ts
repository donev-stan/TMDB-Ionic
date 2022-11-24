import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

interface deviceType {
  device: 'desktop' | 'mobile';
}

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  private _device: deviceType;

  get device(): deviceType {
    return this._device;
  }

  set device(type: deviceType) {
    this._device = type;
  }

  constructor(public platform: Platform) {
    this._device = platform.is('desktop')
      ? { device: 'desktop' }
      : { device: 'mobile' };
  }
}
