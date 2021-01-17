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
  private totalDnas: number

  public enzymes: EnzymeEntity[]
  private totalEnzymes: number

  public genes: GeneEntity[]
  private totalGenes: number

  public selectedEntityType
  public selectedEntity: DnaEntity|EnzymeEntity|GeneEntity
  public entityList:  DnaEntity[]|EnzymeEntity[]|GeneEntity[]
  public selectedEntityIndex: number
  public selectedEntityTotal: number

  public contentLoaded
  public formReady: boolean

  public currentPage = 1
  public entitiesPerPage = 3
  public pageTotal = 1

  async ngOnInit() {

    this.contentLoaded = false

    /* RETRIEVE DATA */
    let dnaResponse = await this.dnaService.getAll(0, this.entitiesPerPage)
    this.dnas = dnaResponse.entities
    this.totalDnas = dnaResponse.total

    this.setEntityList("dna")
    this.contentLoaded = true

    let enzymeResponse = await this.enzymeService.getAll(0, this.entitiesPerPage)
    this.enzymes = enzymeResponse.entities
    this.totalEnzymes = enzymeResponse.total

    let genesResponse = await this.geneService.getAll(0, this.entitiesPerPage)
    this.genes = genesResponse.entities
    this.totalGenes = genesResponse.total

  }

  public setEntityList(entityType: string){

    this.selectedEntityType = entityType
    let offsetStart = (this.currentPage - 1) * this.entitiesPerPage
    let offsetEnd = offsetStart + this.entitiesPerPage

    if(this.selectedEntityType == "dna") {
      this.selectedEntityTotal = this.totalDnas
      this.entityList = this.dnas.slice(offsetStart, offsetEnd)
    }else if(this.selectedEntityType == "gene"){
      this.selectedEntityTotal = this.totalGenes
      this.entityList = this.genes.slice(offsetStart, offsetEnd)
    }else if(this.selectedEntityType == "enzyme"){
      this.selectedEntityTotal = this.totalEnzymes
      this.entityList = this.enzymes.slice(offsetStart, offsetEnd)
    }

    this.pageTotal = Math.ceil(this.selectedEntityTotal / this.entitiesPerPage)

  }

  async editEntity(f: NgForm) {

    if(!f.valid)
      return alert("all inputs are required (temporary)")

    console.log(this.selectedEntityIndex)
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

    console.log(response)
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
      if(response){
        this.totalDnas += 1
        this.dnas.push(response)
      }
    }else if(this.selectedEntityType == "enzyme"){
      response = await this.enzymeService.createNew(f.value.name, f.value.sequence, f.value.upperCut, f.value.lowerCut)
      if(response){
        this.totalEnzymes += 1
        this.enzymes.push(response)
      }
    }else if(this.selectedEntityType == "gene"){
      response = await this.geneService.createNew(f.value.name, f.value.sequence)
      if(response) {
        this.totalGenes += 1
        this.genes.push(response)
      }
    }

    if(response){
      this.setEntityList(this.selectedEntityType)
    }else{
      alert("error creating" + f.value)
    }


  }

  async deleteEntity(){
    console.log(this.selectedEntityIndex)

    let response
    if(this.selectedEntityType == "dna"){
      response = await this.dnaService.deleteById(this.selectedEntity.id)
      if(response) {
        this.totalDnas -= 1
        this.dnas.splice(this.selectedEntityIndex, 1)
      }
    }else if(this.selectedEntityType == "enzyme"){
      response = await this.enzymeService.deleteById(this.selectedEntity.id)
      if(response){
        this.totalEnzymes -= 1
        this.enzymes.splice(this.selectedEntityIndex, 1)
      }
    }else if(this.selectedEntityType == "gene"){
      response = await this.geneService.deleteById(this.selectedEntity.id)
      if(response){
        this.totalGenes -= 1
        this.genes.splice(this.selectedEntityIndex, 1)
      }
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

  async changePage(page: number){

    if(page == this.currentPage)
      return

    let offset = (page - 1) * this.entitiesPerPage
    this.currentPage = page

    if(this.selectedEntityType == "dna"){
      const response = await this.dnaService.getAll(offset, this.entitiesPerPage)
      const entities = response.entities
      this.totalDnas = response.total
      for(let i = 0; i < entities.length; i++){
        this.dnas[offset + i] = entities[i]
      }
    } else if(this.selectedEntityType == "gene"){
      const response = await this.geneService.getAll(offset, this.entitiesPerPage)
      const entities = response.entities
      this.totalDnas = response.total
      for(let i = 0; i < entities.length; i++){
        this.genes[offset + i] = entities[i]
      }
    } else if(this.selectedEntityType == "enzyme"){
      const response = await this.enzymeService.getAll(offset, this.entitiesPerPage)
      const entities = response.entities
      this.totalDnas = response.total
      for(let i = 0; i < entities.length; i++){
        this.enzymes[offset + i] = entities[i]
      }
    }

    this.setEntityList(this.selectedEntityType)

  }

  async filter(query){
    let response = await this.dnaService.getByName(query, this.entitiesPerPage, 0)
    console.log(response)
  }
}
