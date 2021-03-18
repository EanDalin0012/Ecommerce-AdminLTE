import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../m-share/service/authentication.service';
import { LocalStorage, ResponseStatus } from '../../m-share/constants/common.const';
import { Utils } from '../../m-share/utils/utils.static';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  jsonData: any = {
    notification: [],
    message: [],
  };
  notifications: any;
  messagesData: any;

  langCode          = this.translate.currentLang;
  langData          = {
    en: { class: 'eng', text: 'English', src: 'assets/img/flags/us.png'},
    kh: { class: 'khmer', text: 'ខ្មែរ', src: 'assets/img/flags/kh.png'},
    ch: { class: 'china', text: '中文', src: 'assets/img/flags/cn.png'},
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    ) {}

  ngOnInit(): void {
    this.notifications = [
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "4 mins ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "1 hour ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "4 mins ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "1 hour ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "4 mins ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "1 hour ago",
      },
    ];

    this.messagesData = [
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
    ];
  }

  getDatas(section): void {

  }

  clearData(section): void {
    this.jsonData[section] = [];
  }
  onSubmit(): void {
    this.router.navigate(['/pages/search']);
  }

  logout(): void {
    this.authenticationService.revokeToken().then(resp => {
      if (resp === ResponseStatus.Y) {
        Utils.removeSecureStorage(LocalStorage.USER_INFO);
        Utils.removeSecureStorage(LocalStorage.Authorization);
        this.router.navigate(['/login']);
      }
    });
  }

  onChangeLanguage(code: string): void {
    this.langCode = code;
    console.log(this.langCode, LocalStorage.I18N, code);
    Utils.setSecureStorage(LocalStorage.I18N, this.langCode );
    this.translate.use( this.langCode );
  }

}
