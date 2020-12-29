import {Component, OnInit, ViewChild} from '@angular/core';
import {PlasmidJsIframeComponent} from '../plasmid-js-iframe/plasmid-js-iframe.component';
import {GenesService} from '../../services/genes.service';
import {GeneEntity} from '../../entities/gene.entity';
import {DnaService} from '../../services/dna.service';
import {DnaEntity} from '../../entities/dna.entity';
import {EnzymeEntity} from '../../entities/enzyme.entity';
import {EnzymeService} from '../../services/enzyme.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-analyisis',
  templateUrl: './analyisis.component.html',
  styleUrls: ['./analyisis.component.css']
})
export class AnalyisisComponent implements OnInit {

  @ViewChild('iframeComponent') iframeComponent: PlasmidJsIframeComponent;

  constructor(private genesService: GenesService, private dnaService: DnaService, private enzymeService: EnzymeService, private formBuilder: FormBuilder) {
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


  message = {msg: 'hello', data: 'test'};

  public sendDataToIframeSource(data) {
    this.iframeComponent.sendMessage(data);
  }

  public async getAllGenes() {

    const allGenes = await this.genesService.getAll();
    console.log('all genes', allGenes);

  }

  public onSubmit(){
    this.submitted = true
    if(this.plasmidForm.valid)
      console.log(this.plasmidForm.value)
  }

  public log(data: any) {
    console.log(data);
  }


  /* GETTERS FOR FORMS */
  get selectedDnaId(){
    return this.plasmidForm.get('selectedDnaId')
  }

}
