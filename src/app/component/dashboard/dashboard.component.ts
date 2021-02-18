import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartData;
  chartOptions;
  lineData;
  lineOption;
  barColors = {
    a: '#007bff',
    b: '#6610f2',
  };
  lineColors = {
    a: '#007bff',
    b: '#6610f2',
  };

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];
  }

}
