import MainPokemon from "./MainPokemon";
import Pokemon from "./Pokemon";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<MainPokemon />} />
      </Routes>
    </BrowserRouter>
  );
}
