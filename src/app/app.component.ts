import { Component, OnInit } from '@angular/core';
import { Utils } from './m-share/utils/utils.static';
import { Language, LocalStorage } from './m-share/constants/common.const';
import { DeviceInfoService } from './m-share/service/device-info.service';
import { JsonIPService } from './m-share/service/json-ip.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Ecommerce-AdminLTE';

  constructor(
    private translate: TranslateService,
    private deviceInfoService: DeviceInfoService,
    private jsonIPService: JsonIPService
  ) {
    this.deviceInfoService.deviceDetectorInfo();
    this.jsonIPService.jsonIp();
  }
  ngOnInit(): void {
    this.setInitialAppLanguage();
  }

  setInitialAppLanguage(): void {
    const i18n = Utils.getSecureStorage(LocalStorage.I18N );
    if ( !i18n ) {
      Utils.setSecureStorage(LocalStorage.I18N, Language.I18N_EN.toString());
      this.translate.setDefaultLang( Language.I18N_EN.toString() );
      this.translate.use( Language.I18N_EN.toString() );
    } else {
      this.translate.setDefaultLang( 'en' );
      this.translate.use( i18n );
    }
  }
}
