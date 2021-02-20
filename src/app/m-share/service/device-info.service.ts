import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorage } from '../constants/common.const';
import { DeviceDetectorInfo } from '../model/device-detector-info';
import { StoreInMemoryModel } from '../model/store-in-memory-model';
@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {
  storeInMemoryModel = new StoreInMemoryModel();

  constructor(private deviceDetectorService: DeviceDetectorService) { }

  public deviceDetectorInfo(): void {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo();
    const deviceDetectorInfo = new DeviceDetectorInfo();
    deviceDetectorInfo.userAgent = deviceInfo.userAgent;
    deviceDetectorInfo.os         = deviceInfo.os;
    deviceDetectorInfo.browser    = deviceInfo.browser;
    deviceDetectorInfo.device     = deviceInfo.device;
    deviceDetectorInfo.osVersion  = deviceInfo.os_version;
    deviceDetectorInfo.browserVersion = deviceInfo.browser_version;
    deviceDetectorInfo.deviceType = deviceInfo.deviceType;
    deviceDetectorInfo.orientation = deviceInfo.orientation;

    this.storeInMemoryModel.set(LocalStorage.DeviceInfo, deviceDetectorInfo);
  }
}
