import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DnaService} from '../../services/dna.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dnaService: DnaService) {
  }

  async ngOnInit() {
    this.mainEntities = await this.dnaService.getAll()
    console.log(this.mainEntities)
  }

  public setMainContent(currentPosition: number) {
    const temp = this.graphs[currentPosition];
    this.graphs[currentPosition] = this.mainGraph;
    this.mainGraph = temp;
  }


  graphs = [
    {
      data: [
        { data: [85, 72, 28, 45, 67, 50] }
      ],
      name: 'DNA',
      current: 10,
      max: 50,
      description: "10 / 50"
    },
    {
      data: [
        { data: [85, 32, 98, 75, 107, 75] }
      ],
      name: 'ENZYMES',
      current: 50,
      max: 120,
      description: "50 / 120"
    },
    {
      data: [
        { data: [65, 72, 73, 64, 83, 75] }
      ],
      name: 'GENES',
      current: 15,
      max: 50,
      description: "15 / 50"
    }
  ];

  mainGraph = {
    data: [
      { data: [10, 0, 4, 12, 2, 0] }
    ],
    name: 'Analysis',
    current: null,
    max: null,
    description: 'description'
  }

  mainEntities = []

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
