import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayPokemons from "./DisplayPokemons/DisplayPokemons";
import PokemonDetails from "./PokemonDetails/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayPokemons />} />
        <Route path="/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
