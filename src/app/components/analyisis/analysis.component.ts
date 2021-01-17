import {Component, OnInit, ViewChild} from '@angular/core';
import {PlasmidJsIframeComponent} from '../plasmid-js-iframe/plasmid-js-iframe.component';
import {GenesService} from '../../services/genes.service';
import {GeneEntity} from '../../entities/gene.entity';
import {DnaService} from '../../services/dna.service';
import {DnaEntity} from '../../entities/dna.entity';
import {EnzymeService} from '../../services/enzyme.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AnalysisService} from '../../services/analysis.service';
import {AnalysisResponseEntity} from '../../entities/analysisResponse.entity';
import {CutOrientation} from '../../entities/cutOrientation';
import {EnzymeEntity} from '../../entities/enzyme.entity';


@Component({
  selector: 'app-analyisis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  @ViewChild('iframeComponent') iframeComponent: PlasmidJsIframeComponent;

  constructor(private _formBuilder: FormBuilder, private genesService: GenesService, private dnaService: DnaService, private enzymeService: EnzymeService, private analysisService: AnalysisService) {
  }
  firstFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl()
  });
  secondFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl()
  });

  isEditable = true;

  /* DATA HOLDERS */
  private allGenes: GeneEntity[];
  private totalDnas: number

  private allDna: DnaEntity[];
  private totalEnzymes: number

  private allEnzymes: EnzymeEntity[];
  private totalGenes: number

  public entityList: DnaEntity[]|GeneEntity[]|EnzymeEntity[];

  public contentLoaded = false;

  public selectedDna: any;
  public selectedEnzymes: any[] = [];
  public selectedGenes: any[] = [];

  /* PERSISTENCE FOR HIGHLIGHTED ENTITIES */
  public highlightedIndexes: { 1: number[], 2: number[], 3: number[] } = {
    1: [],
    2: [],
    3: []
  };

  public step = 1;

  /* FORMS */
  public plasmidForm = new FormGroup({
    selectedDnaId: new FormControl('', [Validators.required]),
    selectedEnzymesId: new FormControl(''),
    selectedGenesId: new FormControl('')
  });


  public submitted = false;
  public showIframe = false;

  async ngOnInit() {

    let dnaResponse = await this.dnaService.getAll()
    this.allDna = dnaResponse.entities
    this.totalDnas = dnaResponse.total
    this.entityList = this.allDna
    this.contentLoaded = true;

    let enzymeResponse = await this.enzymeService.getAll()
    this.allEnzymes = enzymeResponse.entities
    this.totalEnzymes = enzymeResponse.total

    let genesResponse = await this.genesService.getAll()
    this.allGenes = genesResponse.entities
    this.totalGenes = genesResponse.total

  }

  public nextStep() {
    this.step++;
    if (this.step == 2) {
      this.entityList = this.allEnzymes;
    } else if (this.step == 3) {
      this.entityList = this.allGenes;
    }
  }

  public previousStep() {
    this.step--;
    if (this.step == 1) {
      this.entityList = this.allDna;
    } else if (this.step == 2) {
      this.entityList = this.allEnzymes;
    }
  }

  public stepChange(event: any){


    let selectedStep = event.selectedIndex + 1

    /* IF ON FINAL STEP */
    if(selectedStep > 3)
      return

    /* CHANGE STEPS UNTIL THE RIGHT ONE IS DISPLAYED */
    while (selectedStep != this.step){
      if(selectedStep > this.step)
        this.nextStep()
      else
        this.previousStep()
    }
  }



  public toggleEntity(entity: any, index: number) {

    let indexInSelectedArray = this.highlightedIndexes[this.step].indexOf(index);
    if (indexInSelectedArray > -1) {

      this.highlightedIndexes[this.step].splice(indexInSelectedArray, 1);
      if (this.step == 1) {
        this.selectedDna = null;
      } else if (this.step == 2) {
        this.selectedEnzymes.splice(indexInSelectedArray, 1);
      } else if (this.step == 3) {
        this.selectedGenes.splice(indexInSelectedArray, 1);
      }

    } else {

      this.highlightedIndexes[this.step].push(index);
      if (this.step == 1) {
        this.highlightedIndexes[this.step] = [index];
        this.selectedDna = entity;
      } else if (this.step == 2) {
        this.selectedEnzymes.push(entity);
      } else if (this.step == 3) {
        this.selectedGenes.push(entity);
      }

    }


  }

  public sendDataToIframeSource(data) {
    this.iframeComponent.sendMessage(data);
  }

  public async analyze() {
    const request = {
      dnaId: this.selectedDna.id,
      enzymeIds: this.selectedEnzymes.map(enzyme => enzyme.id),
      geneIds: this.selectedGenes.map(gene => gene.id)
    };

    console.log(request);

    try {
      const response = await this.analysisService.analyze(request) as AnalysisResponseEntity;
      if (response && response.data && response.data.analyzeDna) {

        /* parse data */
        let data = response.data.analyzeDna;
        let genes = data.genes;
        let enzymes = data.enzymes;

        console.log(response);

        /* prepare data for drawing */
        let overlaps = this.combineOverlaps(genes);

        /* send data to iframe */
        this.sendDataToIframeSource({type: 'create', dna: data.dna, enzymes: enzymes, overlaps: overlaps});
        this.showIframe = true;

      } else {
        this.showIframe = false;
      }
    } catch (e) {
      this.showIframe = false;
      console.log('error while preforming analysis', e);
    }

  }

  public async onSubmit() {
    this.submitted = true;
    if (!this.plasmidForm.valid) {
      return;
    }

    const request = {
      dnaId: this.plasmidForm.controls['selectedDnaId'].value,
      enzymeIds: this.plasmidForm.controls['selectedEnzymesId'].value,
      geneIds: this.plasmidForm.controls['selectedGenesId'].value
    };

    try {
      const response = await this.analysisService.analyze(request) as AnalysisResponseEntity;
      if (response && response.data && response.data.analyzeDna) {

        /* parse data */
        let data = response.data.analyzeDna;
        let genes = data.genes;
        let enzymes = data.enzymes;

        /* prepare data for drawing */
        let overlaps = this.combineOverlaps(genes);

        /* send data to iframe */
        this.sendDataToIframeSource({type: 'create', dna: data.dna, enzymes: enzymes, overlaps: overlaps});
        this.showIframe = true;

      } else {
        this.showIframe = false;
      }
    } catch (e) {
      this.showIframe = false;
      console.log('error while fetching data from graphql', e);
    }


  }

  private combineOverlaps(genes: { overlaps: { fromIndex: number, toIndex: number, orientation: string }[], gene: GeneEntity }[]) {
    let overlaps = [];
    for (const gene of genes) {
      for (const overlap of gene.overlaps) {

        let {r, g, b} = this.getRandomRGB();
        overlap['fill'] = 'fill:rgba(' + r + ',' + g + ',' + b + ',' + '0.8' + ')';

        overlap['name'] = gene.gene.name;
        overlap['positive'] = overlap.orientation == CutOrientation.POSITIVE;
        overlaps.push(overlap);

      }
    }

    return overlaps;
  }

  private getRandomRGB() {
    let r = Math.random() * 256 | 0;
    let g = Math.random() * 256 | 0;
    let b = Math.random() * 256 | 0;

    return {r: r, g: g, b: g};

  }

  /* GETTERS FOR FORMS */
  get selectedDnaId() {
    return this.plasmidForm.get('selectedDnaId');
  }

  get selectedEnzymesId() {
    return this.plasmidForm.get('selectedEnzymesId');
  }

  get selectedGenesId() {
    return this.plasmidForm.get('selectedGenesId')
  }

}
