export const environment = {
  production: true,
  plasmidJsSrc: 'https://plasmid-js.mydna.codes/',
  backendUrl: 'https://sequence-bank-test.mydna.codes/v1/',
  resultsUrl: "https://result-test.mydna.codes/v1/",
  crudEndpoints: {
    dna: 'dna',
    enzyme: 'enzyme',
    gene: 'gene',
    results: 'results'
  },
  graphQlEndpoint: 'https://analysis-test.mydna.codes/graphql',
  keycloak: {
    url: "https://keycloak.din-cloud.com/auth/",
    realm: "mydnacodes",
    client: "mydnacodes-public"
  }

};
