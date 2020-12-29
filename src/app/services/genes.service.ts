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

}
