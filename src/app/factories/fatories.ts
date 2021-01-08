import {KeycloakService} from "@procempa/ngx-keycloak";
import {environment} from "../../environments/environment";

export function initKeycloak(keycloak: KeycloakService) {
  const env = {
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.client
  };

  return () => keycloak.init(env, { onLoad: 'check-sso' });
}
