import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DnaEntity} from '../entities/dna.entity';


@Injectable({
  providedIn: 'root'
})
export class DnaService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(offset: number = 0, limit: number = 10): Promise<{ entities: DnaEntity[], total: number }> {
    let url = environment.backendUrl + environment.crudEndpoints.dna;
    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());
    return this.httpClient.get(url, {observe: 'response', params: params})
      .toPromise()
      .then((res) => {

        let entities = res.body as DnaEntity[]
        let total = parseInt(res['headers'].get('X-Total-Count'))

        return {
          entities: entities,
          total: total
        }

      })
      .catch((err) => {
        console.log('error fetching all genes', err);
        return {
          entities: [],
          total: 0
        };
      });
  }

  public getById(id): Promise<DnaEntity> {
    let url = environment.backendUrl + environment.crudEndpoints.dna + '/' + id;
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as DnaEntity;
      })
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log('error fetching dna w/ id', id, err);
        return null;
      });
  }

  public createNew(name: string, sequenceValue: string) {

    const dna = {name: name, sequence: {value: sequenceValue}};

    let url = environment.backendUrl + environment.crudEndpoints.dna;
    return this.httpClient.post(url, dna)
      .toPromise()
      .then((res) => {
        return res as DnaEntity;
      })
      .catch((err) => {
        console.log('error creating dna', err);
        return null;
      });
  }

  public edit(id: string, name: string, sequenceValue: string) {

    const dna = {name: name, sequence: {value: sequenceValue}};

    let url = environment.backendUrl + environment.crudEndpoints.dna + '/' + id;
    return this.httpClient.put(url, dna)
      .toPromise()
      .then((res) => {
        return res as DnaEntity;
      })
      .catch((err) => {
        console.log('error updating dna', err);
        return null;
      });
  }

  public deleteById(id: string) {
    let url = environment.backendUrl + environment.crudEndpoints.dna + '/' + id;
    return this.httpClient.delete(url)
      .toPromise()
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log('error fetching dna w/ id', id, err);
        return null;
      });
  }

  public getByName(query: string, limit: number = 10, offset: number = 0){
    let url = environment.backendUrl + environment.crudEndpoints.dna;
    let nameQuery = "?filter=name:LIKE" + encodeURIComponent("%") + query + encodeURIComponent("%")
    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString()).set("?filter", "name:LIKE%" + query + "%")
    return this.httpClient.get(url, {observe: 'response', params: params})
      .toPromise()
      .then((res) => {

        let entities = res.body as DnaEntity[]
        let total = parseInt(res['headers'].get('X-Total-Count'))

        return {
          entities: entities,
          total: total
        }

      })
      .catch((err) => {
        console.log('error fetching all genes', err);
        return {
          entities: [],
          total: 0
        };
      });
  }

}
