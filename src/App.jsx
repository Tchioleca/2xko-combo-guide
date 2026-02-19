import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import ComboPage from "./pages/ComboPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/characters/:characterId/combos/:comboId" element={<ComboPage />} />
        <Route path="/combos/:id" element={<ComboPage />} />
      </Routes>
    </div>
  );
}

export default App;

