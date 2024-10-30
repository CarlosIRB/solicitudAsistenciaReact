import { useToken } from "../contexts/TokenContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cliente = () => {
  const { token } = useToken();
  const [solicitudes, setSolicitudes] = useState([]);

  const navigate = useNavigate();

  const obtenerSolicitudes = async () => {
    const ruta = "http://localhost:5000/api/SolicitudAsistencia/cliente/historial";
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

  const handleDetalles = (solicitud) => {
    navigate(`/detalle-solicitud/${solicitud.id}`);
  };

  const handleNuevaSolicitud = () => {
    navigate("/nueva-solicitud");
  };

  return (
    <div className="container mt-3 text-center">
      <button
        type="button"
        className="btn btn-success m-2"
        onClick={handleNuevaSolicitud}
      >
        Nueva solicitud de asistencia
      </button>
      <br />
      <h2>Solicitudes de Asistencia</h2>
      <div className="row">
        {solicitudes.map((solicitud) => (
          <div className="col-12 col-md-6 col-lg-4" key={solicitud.id}>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">{solicitud.nombreCategoria}</h5>
                <p className="card-text"><strong>Descripción:</strong> {solicitud.descripcion}</p>
                <p className="card-text"><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechaSolicitud).toLocaleString()}</p>
                <p className="card-text"><strong>Agente:</strong> {solicitud.nombreAgente} ({solicitud.emailAgente})</p>
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
    </div>
  );
};

export default Cliente;
