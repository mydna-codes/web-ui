import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EnzymeEntity} from '../entities/enzyme.entity';


@Injectable({
  providedIn: 'root'
})
export class EnzymeService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(offset: number = 0): Promise<EnzymeEntity[]>{
    let url = environment.backendUrl + environment.crudEndpoints.enzyme

    let params = new HttpParams().set("limit", "2").set("offset", offset.toString())
    return this.httpClient.get(url, {observe: 'response', params: params})
      .toPromise()
      .then((res) => {
        return res["body"] as EnzymeEntity[];
      })
      .then((res) => {
        return res
      }).catch((err) => {
        console.log("error fetching all enzymes", err)
        return []
      })
  }

  public getById(id): Promise<EnzymeEntity>{
    let url = environment.backendUrl + environment.crudEndpoints.enzyme + "/" + id
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity;
      })
      .then((res) => {
        return res
      }).catch((err) => {
        console.log("error fetching enzyme w/ id", id, err)
        return null
      })
  }

  public createNew(name: string, sequenceValue: string, upperCut: number, lowerCut: number){

    const enzyme = {name: name, sequence: {value: sequenceValue}, upperCut: upperCut, lowerCut: lowerCut}

    let url = environment.backendUrl + environment.crudEndpoints.enzyme
    return this.httpClient.post(url, enzyme)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity;
      })
      .catch((err) => {
        console.log("error creating enzyme", err)
        return null
      })
  }

  public edit(id: number, name: string, sequenceValue: string, upperCut: number, lowerCut: number){

    const enzyme = {name: name, sequence: {value: sequenceValue}, upperCut: upperCut, lowerCut: lowerCut}

    let url = environment.backendUrl + environment.crudEndpoints.enzyme + "/" + id
    return this.httpClient.put(url, enzyme)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity;
      })
      .catch((err) => {
        console.log("error updating enzyme", err)
        return null
      })
  }

  public deleteById(id :number){
    let url = environment.backendUrl + environment.crudEndpoints.enzyme + "/" + id
    return this.httpClient.delete(url)
      .toPromise()
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log("error deleting enzyme w/ id", id, err)
        return null
      })
  }


}
