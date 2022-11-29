import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceType } from '../interfaces/shared';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  private _device: DeviceType;

  get device(): DeviceType {
    return this._device;
  }

  set device(type: DeviceType) {
    this._device = type;
    console.log(type);
  }

  constructor(public platform: Platform) {
    this._device = platform.is('desktop')
      ? { device: 'desktop' }
      : { device: 'mobile' };
  }
}
