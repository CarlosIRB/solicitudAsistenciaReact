// src/App.js
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cliente from "./pages/Cliente";
import Bienvenido from "./pages/Bievenido";
import Agente from "./pages/Agente";
import DetallesSolicitud from "./pages/ClienteDetalleSolicitud";
import ClienteNuevaSolicitudAsistencia from "./pages/ClienteNuevaSolicitud";
import { TokenProvider } from "./contexts/TokenContext";
import "./App.css";

function App() {
  const [isAgent, setIsAgent] = useState(false);

  return (
    <TokenProvider>
      <Router>
        <Navbar isAgent={isAgent} setIsAgent={setIsAgent} />

        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Bienvenido />} />
            <Route path="/detalle-solicitud/:id" element={<DetallesSolicitud/>} />
            <Route path="/nueva-solicitud" element={<ClienteNuevaSolicitudAsistencia/>} />
            <Route path="/cliente" element={<Cliente />} />
            <Route path="/agente" element={<Agente />} />
          </Routes>
        </div>
      </Router>
    </TokenProvider>
  );
}

export default App;
