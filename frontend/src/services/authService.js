import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "heds",
  clientId: "heds-frontend",
});

export default keycloak;
