export interface DnaEntity {
  id: string
  name: string
  sequence: {
    value: string,
    length: number
  }

  lastModified: string
  created: string
}
