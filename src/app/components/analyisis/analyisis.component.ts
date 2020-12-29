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
        this.showIframe = true

        /* parse data */
        let data = response.data.analyzeDna
        let genes = data.genes
        let enzymes = data.enzymes
        let dnaId = data.dnaId

        let dna = await this.dnaService.getById(dnaId) as DnaEntity
        dna.sequence["length"] = dna.sequence.value.length

        const resolvedGenes = await this.resolveGenes(genes)
        const resolvedEnzymes = await this.resolveEnzymes(enzymes)

        this.sendDataToIframeSource({type:"new", dna: dna, enzymes: resolvedEnzymes, genes: resolvedGenes})
      }else{
        this.showIframe = false
      }
    }catch (e) {
      this.showIframe = true
      console.log("error while fetching data from graphql", e)
    }


  }

  private async resolveGenes(genes: object[]){

    for(const index in genes){
      let gene = genes[index]
      let fullGene = await this.genesService.getById(gene["geneId"])
      fullGene["overlaps"] = gene["overlaps"]
      fullGene.sequence["length"] = fullGene.sequence.value.length
      genes[index] = fullGene
    }

    return genes

  }

  private async resolveEnzymes(enzymes: object[]){

    for(const index in enzymes){
      let enzyme = enzymes[index]
      let fullEnzyme = await this.enzymeService.getById(enzyme["enzymeId"])
      fullEnzyme["cuts"] = enzyme["cuts"]
      fullEnzyme.sequence["length"] = fullEnzyme.sequence.value.length
      enzymes[index] = fullEnzyme
    }

    return enzymes

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
