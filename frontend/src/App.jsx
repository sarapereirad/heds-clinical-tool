import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import keycloak from "./services/authService";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EvaluationPage from "./pages/EvaluationPage";
import ImportPage from "./pages/ImportPage";
import SuccessPage from "./pages/SuccessPage";

function App({ authenticated }) {
  const [importedData, setImportedData] = useState(null);

  const handleImport = (data) => {
    setImportedData(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={authenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/evaluation"
          element={
            authenticated ? (
              <EvaluationPage importedData={importedData} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/import"
          element={
            authenticated ? (
              <ImportPage onImport={handleImport} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/success"
          element={authenticated ? <SuccessPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
