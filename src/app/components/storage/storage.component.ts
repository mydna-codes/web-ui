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
  public selectedEntityIndex

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

  async editEntity(f: NgForm) {

    if(!f.valid)
      return alert("all inputs are required (temporary)")

    let response
    if(this.selectedEntityType == "dna"){
      response = await this.dnaService.edit(this.selectedEntity.id, f.value.name, f.value.sequence)
      if(response)
        this.dnas[this.selectedEntityIndex] = response
    }else if(this.selectedEntityType == "enzyme"){
      response = await this.enzymeService.edit(this.selectedEntity.id, f.value.name, f.value.sequence, f.value.upperCut, f.value.lowerCut)
      if(response)
        this.enzymes[this.selectedEntityIndex] = response
    }else if(this.selectedEntityType == "gene"){
      response = await this.geneService.edit(this.selectedEntity.id, f.value.name, f.value.sequence)
      if(response)
        this.genes[this.selectedEntityIndex] = response
    }

    if(response){
      this.setEntityList(this.selectedEntityType)
    }else{
      alert("error creating" + f.value)
    }


  }

  async createEntity(f: NgForm) {

    if(!f.valid)
      return alert("all inputs are required (temporary)")

    let response
    if(this.selectedEntityType == "dna"){
      response = await this.dnaService.createNew(f.value.name, f.value.sequence)
      if(response)
        this.dnas.push(response)
    }else if(this.selectedEntityType == "enzyme"){
      response = await this.enzymeService.createNew(f.value.name, f.value.sequence, f.value.upperCut, f.value.lowerCut)
      if(response)
        this.enzymes.push(response)
    }else if(this.selectedEntityType == "gene"){
      response = await this.geneService.createNew(f.value.name, f.value.sequence)
      if(response)
        this.genes.push(response)
    }

    if(response){
      this.setEntityList(this.selectedEntityType)
    }else{
      alert("error creating" + f.value)
    }


  }

  async deleteEntity(){

    let response
    if(this.selectedEntityType == "dna"){
      response = await this.dnaService.deleteById(this.selectedEntity.id)
      if(response)
        this.dnas.splice(this.selectedEntityIndex, 1)
    }else if(this.selectedEntityType == "enzyme"){
      response = await this.enzymeService.deleteById(this.selectedEntity.id)
      if(response)
        this.enzymes.splice(this.selectedEntityIndex, 1)
    }else if(this.selectedEntityType == "gene"){
      response = await this.geneService.deleteById(this.selectedEntity.id)
      if(response)
        this.genes.splice(this.selectedEntityIndex, 1)
    }

    if(response){
      this.setEntityList(this.selectedEntityType)
    }else{
      alert("error deleting" + this.selectedEntity)
    }

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
