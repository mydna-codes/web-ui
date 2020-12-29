import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DnaEntity} from '../entities/dna.entity';


@Injectable({
  providedIn: 'root'
})
export class DnaService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(): Promise<DnaEntity[]>{
    let url = environment.backendUrl + environment.crudEndpoints.dna
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as DnaEntity[];
      })
      .then((res) => {
        return res
      }).catch((err) => {
        console.log("error fetching all genes", err)
        return []
      })
  }

  public getById(id): Promise<DnaEntity>{
    let url = environment.backendUrl + environment.crudEndpoints.dna + "/" + id
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as DnaEntity;
      })
      .then((res) => {
        return res
      }).catch((err) => {
        console.log("error fetching gene w/ id", id, err)
        return null
      })
  }

}
