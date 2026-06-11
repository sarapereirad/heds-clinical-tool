import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EvaluationPage from "./pages/EvaluationPage";

function App({ authenticated }) {
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
            authenticated ? <EvaluationPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
