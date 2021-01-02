import {EnzymeEntity} from './enzyme.entity';
import {GeneEntity} from './gene.entity';
import {DnaEntity} from './dna.entity';

export interface AnalysisResponseEntity {
  data: {
    analyzeDna: {
      dna: DnaEntity,
      enzymes: {cuts: any[], enzyme: EnzymeEntity}[],
      genes: {overlaps: {fromIndex: number, toIndex: number, orientation: string}[], gene: GeneEntity}[]
    }
  }

}
