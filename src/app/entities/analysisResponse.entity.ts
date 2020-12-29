import {EnzymeEntity} from './enzyme.entity';
import {GeneEntity} from './gene.entity';

export interface AnalysisResponseEntity {
  data: {
    analyzeDna: {
      dnaId: string,
      enzymes: EnzymeEntity[],
      genes: GeneEntity[]
    }
  }
}
