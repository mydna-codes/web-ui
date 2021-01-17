import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EnzymeEntity} from '../entities/enzyme.entity';
import {DnaEntity} from '../entities/dna.entity';


@Injectable({
  providedIn: 'root'
})
export class EnzymeService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(offset: number = 0, limit: number = 10): Promise<{ entities: EnzymeEntity[], total: number }> {

    let url = environment.backendUrl + environment.crudEndpoints.enzyme;
    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(url, {observe: 'response', params: params})
      .toPromise()
      .then((res) => {
        let entities = res.body as EnzymeEntity[];
        let total = parseInt(res['headers'].get('X-Total-Count'));

        return {
          entities: entities,
          total: total
        };
      })
      .catch((err) => {
        console.log('error fetching all enzymes', err);
        return {
          entities: [],
          total: 0
        };
      });
  }

  public getById(id): Promise<EnzymeEntity> {
    let url = environment.backendUrl + environment.crudEndpoints.enzyme + '/' + id;
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity;
      })
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log('error fetching enzyme w/ id', id, err);
        return null;
      });
  }

  public createNew(name: string, sequenceValue: string, upperCut: number, lowerCut: number) {

    const enzyme = {name: name, sequence: {value: sequenceValue}, upperCut: upperCut, lowerCut: lowerCut};

    let url = environment.backendUrl + environment.crudEndpoints.enzyme;
    return this.httpClient.post(url, enzyme)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity;
      })
      .catch((err) => {
        console.log('error creating enzyme', err);
        return null;
      });
  }

  public edit(id: string, name: string, sequenceValue: string, upperCut: number, lowerCut: number) {

    const enzyme = {name: name, sequence: {value: sequenceValue}, upperCut: upperCut, lowerCut: lowerCut};

    let url = environment.backendUrl + environment.crudEndpoints.enzyme + '/' + id;
    return this.httpClient.put(url, enzyme)
      .toPromise()
      .then((res) => {
        return res as EnzymeEntity;
      })
      .catch((err) => {
        console.log('error updating enzyme', err);
        return null;
      });
  }

  public deleteById(id: string) {
    let url = environment.backendUrl + environment.crudEndpoints.enzyme + '/' + id;
    return this.httpClient.delete(url)
      .toPromise()
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log('error deleting enzyme w/ id', id, err);
        return null;
      });
  }


}
