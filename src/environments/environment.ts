// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  plasmidJsSrc: 'http://localhost:8000/',
  backendUrl: 'https://sequence-bank-test.mydna.codes/v1/',
  crudEndpoints: {
    dna: 'dna',
    enzyme: 'enzyme',
    gene: 'gene'
  },
  graphQlEndpoint: 'https://analysis-test.mydna.codes/graphql',
  keycloak: {
    url: "https://keycloak.din-cloud.com/auth/",
    realm: "mydnacodes",
    client: "mydnacodes-public"
  }
};

