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
import {AnalysisResponseEntity} from '../../entities/analysisResponse.entity';
import {CutOrientation} from '../../entities/cutOrientation';


@Component({
  selector: 'app-analyisis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

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
  public showIframe = false

  async ngOnInit() {

    /* RETRIEVE DATA FROM SERVER */
    this.allGenes = await this.genesService.getAll();
    this.allDna = await this.dnaService.getAll();
    this.allEnzymes = await this.enzymeService.getAll();


  }

  public sendDataToIframeSource(data) {
    this.iframeComponent.sendMessage(data);
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
      const response = await this.analysisService.analyze(request) as AnalysisResponseEntity
      if(response && response.data && response.data.analyzeDna){

        /* parse data */
        let data = response.data.analyzeDna
        let genes = data.genes
        let enzymes = data.enzymes

        /* prepare data for drawing */
        let overlaps = this.combineOverlaps(genes)

        /* send data to iframe */
        this.sendDataToIframeSource({type:"create", dna: data.dna, enzymes: enzymes, overlaps: overlaps})
        this.showIframe = true

      }else{
        this.showIframe = false
      }
    }catch (e) {
      this.showIframe = false
      console.log("error while fetching data from graphql", e)
    }


  }

  private combineOverlaps(genes: {overlaps: {fromIndex: number, toIndex: number, orientation: string}[], gene: GeneEntity}[]){
    let overlaps = []
    for(const gene of genes)
      for(const overlap of gene.overlaps){

        let {r, g, b} = this.getRandomRGB()
        overlap["fill"] = "fill:rgba(" + r + "," + g + "," + b + "," + "0.8" + ")"

        overlap["name"] = gene.gene.name
        overlap["positive"] = overlap.orientation == CutOrientation.POSITIVE
        overlaps.push(overlap)

      }

    return overlaps
  }

  private getRandomRGB(){
      let r = Math.random()*256|0;
      let g = Math.random()*256|0;
      let b = Math.random()*256|0;

    return {r:r, g:g, b:g}

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
