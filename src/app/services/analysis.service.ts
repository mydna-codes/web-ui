import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

const ANALYSIS_MUTATION = gql`
  mutation analyze ($request: AnalysisRequestInput!){
  analyzeDna(
    request: $request
  ) {
    dnaId
    enzymes {
      enzymeId
      cuts {
        lowerCut
        upperCut
      }
    }
    genes {
      geneId
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

  constructor(private apollo: Apollo) {
  }

  public analyze(request: {}) {
    return this.apollo.mutate({
      mutation: ANALYSIS_MUTATION,
      variables: {request: request}
    }).toPromise();
  }

}
