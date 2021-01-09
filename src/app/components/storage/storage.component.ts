import { Component, OnInit } from '@angular/core';
import {DnaService} from '../../services/dna.service';
import {DnaEntity} from '../../entities/dna.entity';
import {EnzymeEntity} from '../../entities/enzyme.entity';
import {GeneEntity} from '../../entities/gene.entity';
import {EnzymeService} from '../../services/enzyme.service';
import {GenesService} from '../../services/genes.service';
import {FormControl, FormGroup, NgForm} from '@angular/forms';


@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  constructor(private dnaService: DnaService, private enzymeService: EnzymeService, private geneService: GenesService) { }

  public dnas: DnaEntity[]
  public enzymes: EnzymeEntity[]
  public genes: GeneEntity[]
  public selectedEntityType
  public selectedEntity
  public entityList

  public contentLoaded
  public formReady: boolean

  async ngOnInit() {

    this.contentLoaded = false

    /* RETRIEVE DATA */
    this.dnas = await this.dnaService.getAll()
    this.setEntityList("dna")

    this.enzymes = await this.enzymeService.getAll()
    this.genes = await this.geneService.getAll()

    this.contentLoaded = true

    /* SET SELECTED ENTITY TYPE */

    console.log("DNAs:", this.dnas)
    console.log("ENZYMES:", this.enzymes)
    console.log("GENES:", this.genes)

  }

  public setEntityList(entityType: string){

    this.selectedEntityType = entityType

    if(this.selectedEntityType == "dna")
      return this.entityList = this.dnas
    if(this.selectedEntityType == "gene")
      return this.entityList = this.genes
    if(this.selectedEntityType == "enzyme")
      return this.entityList = this.enzymes
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
    console.log(this.selectedEntity)
  }

  async openEdit(entity: any) {

    this.formReady = false

    if(this.selectedEntityType == "dna")
       this.selectedEntity = await this.dnaService.getById(entity.id)
    else if(this.selectedEntityType == "gene")
      this.selectedEntity = await this.geneService.getById(entity.id)
    else if(this.selectedEntityType == "enzyme")
      this.selectedEntity = await this.enzymeService.getById(entity.id)

    this.formReady = true

    console.log(this.selectedEntity)
  }
}
