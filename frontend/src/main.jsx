import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import keycloak from "./services/authService";

keycloak
  .init({
    onLoad: "check-sso",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App authenticated={authenticated} />
      </StrictMode>,
    );
  });
