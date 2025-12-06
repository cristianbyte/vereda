import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorUsuario } from "./context/ProvedorUsuario";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <ProveedorUsuario>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </ProveedorUsuario>
    </BrowserRouter>
  );
}

export default App;
