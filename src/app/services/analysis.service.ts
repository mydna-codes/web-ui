import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AnalysisSummaryEntity} from '../entities/analysisSummary.entity';

const ANALYSIS_MUTATION = gql`
  mutation analyze ($request: AnalysisRequestInput!){
  analyzeDna(
    request: $request
  ){
    dna {
      id
      name
      sequence {
        length
        value
      }
    }
    enzymes {
      enzyme {
        id
        name
        sequence {
          length
          value
        }
      }
      cuts {
        lowerCut
        upperCut
      }
    }
    genes {
      gene {
        id
        name
        sequence {
          length
          value
        }
      }
      overlaps {
        fromIndex
        toIndex
        orientation
      }
    }
    status
    }
  }
  `;

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private apollo: Apollo, private httpClient: HttpClient) {
  }

  public analyze(request: {}) {
    return this.apollo.mutate({
      mutation: ANALYSIS_MUTATION,
      variables: {request: request}
    }).toPromise();
  }

  public getSummaries(): Promise<AnalysisSummaryEntity[]> {
    let url = environment.resultsUrl + environment.crudEndpoints.results
    console.log(url)
    return this.httpClient.get(url, {observe: 'response'})
      .toPromise()
      .then((res) => {
        return res.body as AnalysisSummaryEntity[]
      })
      .catch((err) => {
        console.log('error fetching all summaries', err);
        return []
      });
  }

}
