import {Component, OnInit, ViewChild} from '@angular/core';
import {PlasmidJsIframeComponent} from '../plasmid-js-iframe/plasmid-js-iframe.component';
import {GenesService} from '../../services/genes.service';
import {GeneEntity} from '../../entities/gene.entity';
import {DnaService} from '../../services/dna.service';
import {DnaEntity} from '../../entities/dna.entity';
import {EnzymeEntity} from '../../entities/enzyme.entity';
import {EnzymeService} from '../../services/enzyme.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AnalysisService} from '../../services/analysis.service';


@Component({
  selector: 'app-analyisis',
  templateUrl: './analyisis.component.html',
  styleUrls: ['./analyisis.component.css']
})
export class AnalyisisComponent implements OnInit {

  @ViewChild('iframeComponent') iframeComponent: PlasmidJsIframeComponent;

  constructor(private genesService: GenesService, private dnaService: DnaService, private enzymeService: EnzymeService, private analysisService: AnalysisService) {
  }

  /* DATA HOLDERS */
  public allGenes: GeneEntity[];
  public allDna: DnaEntity[];
  public allEnzymes: any[];

  /* FORMS */
  public plasmidForm = new FormGroup({
    selectedDnaId: new FormControl('', [Validators.required]),
    selectedEnzymesId: new FormControl(''),
    selectedGenesId: new FormControl('')
  });

  public submitted = false

  async ngOnInit() {

    /* RETRIEVE DATA FROM SERVER */
    this.allGenes = await this.genesService.getAll();
    this.allDna = await this.dnaService.getAll();
    this.allEnzymes = await this.enzymeService.getAll();


  }

  public sendDataToIframeSource(data) {
    this.iframeComponent.sendMessage(data);
  }

  public analyze(request: {}){
    return new Promise((resolve, reject) => {
      this.analysisService.analyze(request).subscribe((data) => {
        resolve(data)
      }, (err) => {
        reject(err)
      });
    })
  }

  public async onSubmit(){
    this.submitted = true
    if(!this.plasmidForm.valid)
      return

    const request = {
      dnaId: this.plasmidForm.controls['selectedDnaId'].value,
      enzymeIds: this.plasmidForm.controls['selectedEnzymesId'].value,
      geneIds: this.plasmidForm.controls['selectedGenesId'].value
    };

    try{
      const data = await this.analyze(request)
      console.log(data)
    }catch (e) {
      console.log("error while fetching data from graphql", e)
    }


  }

  /* GETTERS FOR FORMS */
  get selectedDnaId(){
    return this.plasmidForm.get('selectedDnaId')
  }

  get selectedEnzymesId(){
    return this.plasmidForm.get('selectedEnzymesId')
  }

  get selectedGenesId(){
    return this.plasmidForm.get('selectedGenesId')
  }

}
