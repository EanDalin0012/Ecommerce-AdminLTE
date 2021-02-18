import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from "@angular/router";
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
  ) {

    this.members = [
      {active: 'Mike Litorus', count: 3},
      {name: 'John Doe', count: 3},
      {name: 'Richard Miles', count: 0},
      {name: 'John Smith', count: 7},
      {name: 'Mike Litorus', count: 9}
    ];
    this.groups = {
      active: '',
      total: [
        'general',
        'video responsive survey',
        '500rs',
        'warehouse'
      ]
    };

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        $('.main-wrapper').removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
        const url = event.url.split('/');
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
        if (url[1] === '') {
          this.urlComplete.mainUrl = 'dashboard';
          this.urlComplete.subUrl = 'admin';
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

  }

  ngOnInit(): void {
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

  setActive(member): void {
    console.log(member);

  }

}
