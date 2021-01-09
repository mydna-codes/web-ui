import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GeneEntity} from '../entities/gene.entity';


@Injectable({
  providedIn: 'root'
})
export class GenesService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(): Promise<GeneEntity[]>{
    let url = environment.backendUrl + environment.crudEndpoints.gene
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as GeneEntity[];
      })
      .then((res) => {
        return res
      }).catch((err) => {
        console.log("error fetching all genes", err)
        return []
      })
  }

  public getById(id): Promise<GeneEntity>{
    let url = environment.backendUrl + environment.crudEndpoints.gene + "/" + id
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as GeneEntity;
      })
      .then((res) => {
        return res
      }).catch((err) => {
        console.log("error fetching gene w/ id", id, err)
        return null
      })
  }

  public createNew(name: string, sequenceValue: string){

    const gene = {name: name, sequence: {value: sequenceValue}}

    let url = environment.backendUrl + environment.crudEndpoints.gene
    return this.httpClient.post(url, gene)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("error creating gene", err)
        return null
      })
  }

  public edit(id: number, name: string, sequenceValue: string){

    const gene = {name: name, sequence: {value: sequenceValue}}

    let url = environment.backendUrl + environment.crudEndpoints.gene + "/" + id
    return this.httpClient.put(url, gene)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("error updating gene", err)
        return null
      })
  }

  public deleteById(id :number){
    let url = environment.backendUrl + environment.crudEndpoints.gene + "/" + id
    return this.httpClient.delete(url)
      .toPromise()
      .then((res) => {
        return res as GeneEntity;
      }).catch((err) => {
        console.log("error deleting gene w/ id", id, err)
        return null
      })
  }


}
