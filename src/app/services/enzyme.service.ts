import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EnzymeEntity} from '../entities/enzyme.entity';


@Injectable({
  providedIn: 'root'
})
export class EnzymeService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(): Promise<EnzymeEntity[]>{
    let url = environment.backendUrl + environment.crudEndpoints.enzyme
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity[];
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

}
