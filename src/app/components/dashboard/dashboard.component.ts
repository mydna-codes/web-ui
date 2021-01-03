import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75],},
  ];

  lineChartLabels: Label[] = ['', '', '', '', '', ''];

  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        gridLines: {
          display:false
        },
        ticks: {
          display:false
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: '#673ab7',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

}
