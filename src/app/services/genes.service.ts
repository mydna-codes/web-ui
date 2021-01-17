import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GeneEntity} from '../entities/gene.entity';
import {EnzymeEntity} from '../entities/enzyme.entity';


@Injectable({
  providedIn: 'root'
})
export class GenesService {

  constructor(private httpClient: HttpClient) {

  }

  public getAll(offset: number = 0, limit: number = 10): Promise<{ entities: GeneEntity[], total: number }> {

    let url = environment.backendUrl + environment.crudEndpoints.gene;
    let params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.httpClient.get(url, {observe: 'response', params: params})
      .toPromise()
      .then((res) => {
        let entities = res.body as GeneEntity[];
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

  public getById(id): Promise<GeneEntity> {
    let url = environment.backendUrl + environment.crudEndpoints.gene + '/' + id;
    return this.httpClient.get(url)
      .toPromise()
      .then((res) => {
        return res as GeneEntity;
      })
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log('error fetching gene w/ id', id, err);
        return null;
      });
  }

  public createNew(name: string, sequenceValue: string) {

    const gene = {name: name, sequence: {value: sequenceValue}};

    let url = environment.backendUrl + environment.crudEndpoints.gene;
    return this.httpClient.post(url, gene)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('error creating gene', err);
        return null;
      });
  }

  public edit(id: string, name: string, sequenceValue: string) {

    const gene = {name: name, sequence: {value: sequenceValue}};

    let url = environment.backendUrl + environment.crudEndpoints.gene + '/' + id;
    return this.httpClient.put(url, gene)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('error updating gene', err);
        return null;
      });
  }

  public deleteById(id: string) {
    let url = environment.backendUrl + environment.crudEndpoints.gene + '/' + id;
    return this.httpClient.delete(url)
      .toPromise()
      .then((res) => {
        return res as GeneEntity;
      }).catch((err) => {
        console.log('error deleting gene w/ id', id, err);
        return null;
      });
  }


}
