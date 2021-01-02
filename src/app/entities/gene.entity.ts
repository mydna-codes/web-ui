export interface GeneEntity {
  id: string
  name: string
  sequence: {
    value: string,
    length: number
  }

  lastModified: string
  created: string
}
