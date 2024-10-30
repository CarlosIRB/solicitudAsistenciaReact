// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useToken } from "../contexts/TokenContext";

const Navbar = ({ isAgent, setIsAgent }) => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { setToken } = useToken();

  const handleCliente = () => {
    // Redirige según el valor actualizado
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudGVAZXhhbXBsZS5jb20iLCJuYW1lIjoiQ2xpZW50ZSBSZWd1bGFyIiwibmFtZWlkIjoiVTQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJyb2xlIjoiQ2xpZW50ZSIsIm5iZiI6MTczMDMwNzQ3NiwiZXhwIjoxNzMwMzE4Mjc2LCJpYXQiOjE3MzAzMDc0NzZ9.FibIGDwNGc7TPGQFVmhM3yfyPoWuTb2_ZUheszMscTA"
    );
    setIsAgent(false);
    navigate("/cliente");
  };

  const handleAgente = () => {
    // Redirige según el valor actualizado
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFnZW50ZUBleGFtcGxlLmNvbSIsIm5hbWUiOiJBZ2VudGUgZGUgVmVudGFzIiwibmFtZWlkIjoiVTUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJyb2xlIjoiQWdlbnRlIiwibmJmIjoxNzMwMzA3NTYyLCJleHAiOjE3MzAzMTgzNjIsImlhdCI6MTczMDMwNzU2Mn0.h2egVNReSZ1zgMIlE8F2pqyxuMCjAJcKPDJKRsQB9Bs"
    );
    setIsAgent(true);
    navigate("/agente");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div>
        <button
          type="button"
          className="btn btn-light mx-2"
          onClick={()=>{navigate("/")}}
        >
          Inicio
        </button>
        <button
          type="button"
          className="btn btn-light mx-2"
          onClick={handleCliente}
        >
          Cliente
        </button>
        <button
          type="button"
          className="btn btn-light mx-2"
          onClick={handleAgente}
        >
          Agente
        </button>
        <br />
        <span className="text-white">Token: {token ? "Listo":"No hay token"}</span>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAgent: PropTypes.bool.isRequired,
  setIsAgent: PropTypes.func.isRequired,
};

export default Navbar;
