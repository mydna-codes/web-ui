import {Component, OnInit} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {DnaService} from '../../services/dna.service';
import {KeycloakService} from "@procempa/ngx-keycloak";
import {EnzymeService} from '../../services/enzyme.service';
import {GenesService} from '../../services/genes.service';
import {Router} from '@angular/router';
import {AnalysisService} from '../../services/analysis.service';
import {AnalysisSummaryEntity} from '../../entities/analysisSummary.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public totalDnas
  public totalEnzymes
  public totalGenes
  public analysisSummaries: AnalysisSummaryEntity[]

  constructor(private dnaService: DnaService, private enzymeService: EnzymeService, private geneService: GenesService, private analysisService: AnalysisService) {
  }

  async ngOnInit() {

    this.setContentLoaded(false)
    /* RETRIEVE DATA */
    let dnaResponse = await this.dnaService.getAll()
    this.totalDnas = dnaResponse.total

    let enzymeResponse = await this.enzymeService.getAll()
    this.totalEnzymes = enzymeResponse.total

    let genesResponse = await this.geneService.getAll()
    this.totalGenes = genesResponse.total

    this.analysisSummaries = await this.analysisService.getSummaries()
    console.log(this.analysisSummaries)

    this.setContentLoaded(true)
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
    description: 'GRAPH DESCRIPTION'
  }


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
      backgroundColor: 'rgba(103,58,183,0.67)',
    },
  ];

  lineChartPlugins = [];
  lineChartType = 'line';

}
