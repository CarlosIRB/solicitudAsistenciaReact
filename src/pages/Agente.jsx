import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";

const Agente = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [descripcion, setDescripcion] = useState("");
  
  const [solicitudes, setSolicitudes] = useState([]);
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


  const obtenerSolicitudes = async () => {
    const ruta = "http://localhost:5000/api/SolicitudAsistencia/agente";
    const res = await axios.get(ruta, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSolicitudes(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const handleDetalles = (solicitud) => {}


  return (
    <div className="container mt-3">
      <h2>Solicitudes de Asistencia Asignadas</h2>
      <div className="row">
        {solicitudes.map((solicitud) => (
          <div className="col-12 col-md-6 col-lg-4" key={solicitud.id}>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">{solicitud.nombreCategoria}</h5>
                <p className="card-text"><strong>Descripción:</strong> {solicitud.descripcion}</p>
                <p className="card-text"><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechaSolicitud).toLocaleString()}</p>
                <p className="card-text"><strong>Cliente:</strong> {solicitud.nombreAgente} ({solicitud.emailAgente})</p>
                <p className="card-text"><strong>Estatus:</strong> {solicitud.estatus === 1 ? "Enviado" : solicitud.estatus === 2 ? "Atendido" : "Cerrada"}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDetalles(solicitud)}
                >
                  Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <h3>Categorias</h3>
      <ul>
        {categorias.map((categoria) => (
          <li className="" key={categoria.id}>{categoria.nombre}</li>
        ))}
      </ul>
      <button className="btn btn-primary">Edicion ategorias</button>

    </div>
  );
};

export default Agente;
