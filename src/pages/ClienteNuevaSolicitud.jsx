import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";

const ClienteNuevaSolicitudAsistencia = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { token } = useToken();
  const navigate = useNavigate();

  // Obtener categorías al montar el componente
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/SolicitudAsistencia/categorias",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategorias(res.data.filter((categoria) => categoria.estatus));
      } catch (error) {
        console.error("Error al obtener categorías", error);
      }
    };
    obtenerCategorias();
  }, []);

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/SolicitudAsistencia/solicitud", {
        idCategoriaAsistencia: categoriaSeleccionada,
        mayoreo:false,
        descripcion,
        tipo: 0, // Tipo fijo como solicitado
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cliente");
    } catch (error) {
      console.error("Error al enviar solicitud de asistencia", error);
    }
  };

  return (
    <div className="container mt-4">
      <button onClick={()=>navigate("/cliente")} className="btn btn-success">Volver</button>
      <hr />
      <h2>Nueva Solicitud de Asistencia</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Selector de Categoría */}
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoría de Asistencia
          </label>
          <select
            id="categoria"
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Descripción */}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="form-control"
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="btn btn-primary">
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
};

export default ClienteNuevaSolicitudAsistencia;
