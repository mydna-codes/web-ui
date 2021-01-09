import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DnaService} from '../../services/dna.service';
import {timeout} from 'rxjs/operators';
import {KeycloakService} from "@procempa/ngx-keycloak";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dnaService: DnaService, private keyCloakService: KeycloakService) {
  }

  async ngOnInit() {

    this.setContentLoaded(false)

    this.mainEntities = await this.dnaService.getAll()
    console.log(this.mainEntities)
    setTimeout(() => {
      this.setContentLoaded(true)
    }, 2000)
  }

  public login(){
    this.keyCloakService.login()
  }

  setContentLoaded(loaded: boolean){
    this.contentLoaded = loaded
  }

  public contentLoaded

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
