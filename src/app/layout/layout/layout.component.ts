import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public innerHeight: any;

  constructor(private ngZone: NgZone, private router: Router) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + "px";
      });
    };
    this.getScreenHeight();
  }

  ngOnInit(): void {
    // this.router.navigateByUrl('/main/component');
  }

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }

}
