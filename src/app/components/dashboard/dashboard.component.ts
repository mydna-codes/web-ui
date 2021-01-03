import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public setMainContent(currentPosition: number) {
    const temp = this.graphs[currentPosition];
    this.graphs[currentPosition] = this.mainGraph;
    this.mainGraph = temp;
  }

  lineChartData1: ChartDataSets[] = [
    {data: [85, 72, 78, 75, 77, 75],},
  ];

  lineChartData2: ChartDataSets[] = [
    {data: [85, 72, 78, 75, 77, 75],},
  ];

  lineChartData3: ChartDataSets[] = [
    {data: [85, 72, 78, 75, 77, 75],},
  ];

  graphs = [
    {
      data: [
        { data: [85, 72, 78, 75, 77, 75] }
      ],
      name: 'DNA',
      current: 10,
      max: 50,
      description: "10 / 50"
    },
    {
      data: [
        { data: [85, 72, 78, 75, 77, 75] }
      ],
      name: 'ENZYMES',
      current: 50,
      max: 120,
      description: "50 / 120"
    },
    {
      data: [
        { data: [85, 72, 78, 75, 77, 75] }
      ],
      name: 'GENES',
      current: 15,
      max: 50,
      description: "15 / 50"
    }
  ];

  mainGraph = {
    data: [
      { data: [85, 72, 78, 75, 77, 75] }
    ],
    name: 'Analysis',
    current: null,
    max: null,
    description: 'description'
  }

  lineChartDataMain: ChartDataSets[] = [
    {data: [85, 72, 68, 32, 45, 60],},
  ];

  graphData = [this.lineChartData1, this.lineChartData2, this.lineChartData3];

  lineChartLabels: Label[] = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun'];

  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }]
    }
  };
  lineChartOptionsMain = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: true
        },
        ticks: {
          display: true
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: '#673ab7',
    },
  ];

  lineChartPlugins = [];
  lineChartType = 'line';

}
