export interface EnzymeEntity {
  id: string
  name: string
  sequence: {
    value: string,
    length: number
  }
  lowerCut: number
  upperCut: number

  lastModified: string
  created: string
}
