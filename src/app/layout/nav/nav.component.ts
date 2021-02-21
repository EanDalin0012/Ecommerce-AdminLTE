import { UrlCode } from './../../m-share/constants/common.const';

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
import { AllModulesService } from '../../m-share/all-modules.service';
import { SubscribeMessageService } from '../../m-share/service/subscribe-message.service';
declare var $;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  urlComplete = {
    mainUrl: '',
    subUrl: '',
    childUrl: '',
  };

  sidebarMenus = {
    default: true,
    chat: false,
    settings: false,
  };

  members: any;
  groups: any;

  constructor(
    private router: Router,
    private allModulesService: AllModulesService,
    private subscribeMessageService: SubscribeMessageService
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('.main-wrapper').removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
        const url = event.url.split('/');
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
        if (url[1] === '') {
          this.urlComplete.mainUrl = 'main';
          this.urlComplete.subUrl = 'main';
        }

        if (url[2] === 'chat' || url[2] === 'calls') {
          this.sidebarMenus.chat = true;
          this.sidebarMenus.default = false;
        } else {
          this.sidebarMenus.chat = false;
          this.sidebarMenus.default = true;
        }
      }
    });

    this.groups = { ...this.allModulesService.groups };
    console.log(this.groups);
    this.members = { ...this.allModulesService.members };
    console.log(this.members );

  }

  ngOnInit(): void {
    this.subscribeMessageService.visitData.subscribe(message => {
      if (message !== '') {
        setTimeout(() => {
          this.setVisitList(message);
        });
      }
    });

    // Slide up and down of menus
    $(document).on("click", "#sidebar-menu a", function (e) {
      e.stopImmediatePropagation();
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
  }

  setActive(member) {
    this.allModulesService.members.active = member;
  }

  setVisitList(path: string): void {
    switch (path) {
      case 'index':
        this.urlComplete.mainUrl = 'dashboard';
        this.urlComplete.subUrl  = 'admin';
        break;
      case 'component':
        this.urlComplete.mainUrl = 'dashboard';
        this.urlComplete.subUrl  = 'employee';
        break;
      case 'category':
        this.urlComplete.mainUrl = 'register';
        this.urlComplete.subUrl  = 'category';
        break;
      case 'vendor':
        this.urlComplete.mainUrl = 'register';
        this.urlComplete.subUrl  = 'vendor';
        break;
      case 'product':
        this.urlComplete.mainUrl = 'register';
        this.urlComplete.subUrl  = 'product';
        break;
    }
  }

  openPage(urlCode: string): void {
    let url = '/main/';
    switch (urlCode) {
      case 'category':
      case 'vendor':
      case 'product':
        url += `register/${UrlCode[urlCode]}`;
        break;
      case 'componentInput':
      case 'adminDashboard':
        url += `component/${UrlCode[urlCode]}`; // 'imports/' + ${URLCODE[urlCode]} // URLCODE.Register5000;
        break;
      case '3000': // setting
        url += `home/${UrlCode[urlCode]}`;
        break;
      case 'User1000': // setting
      case 'UserMngAcc': // setting Set-Price-Product
      case 'User-Info':
      case 'Set-Price-Product':
        url += `user-management/${UrlCode[urlCode]}`;
        break;
    }
    this.router.navigate([url]);
  }

}
