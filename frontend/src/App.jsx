import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EvaluationPage from "./pages/EvaluationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
