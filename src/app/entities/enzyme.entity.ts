export interface EnzymeEntity {
  id: string
  name: string
  sequence: {
    value: string
  }
  lowerCut: number
  upperCut: number

  lastModified: string
  created: string
}
