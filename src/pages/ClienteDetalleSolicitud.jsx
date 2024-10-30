import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useToken } from "../contexts/TokenContext";
import { useNavigate } from "react-router-dom";

const DetallesSolicitud = () => {
  const { id } = useParams();
  const { token } = useToken();
  const [solicitud, setSolicitud] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerSolicitud = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/SolicitudAsistencia/solicitud/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSolicitud(res.data);
      console.log(res.data);
    };

    obtenerSolicitud();
  }, [id, token]);

  const eliminarPeticion = async (solicitudId, descripcion) => {
    const elimRes =await axios.put(
    "http://localhost:5000/api/SolicitudAsistencia/solicitud/eliminar",
    {
      idSolicitudAsistencia: solicitudId,
      descripcion: descripcion,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );}

  if (!solicitud) return <p>Cargando...</p>;

  const eliminarSolicitud = async (solicitudId, descripcion) => {

    const customSwalStyle = {
        width: '400px',
        maxWidth: '90vw',
      };

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      input: "text",
      customClass: {
        popup: 'swal-popup-style'
      },
      didOpen: () => {
        const swalPopup = document.querySelector('.swal-popup-style');
        if (swalPopup) {
          Object.assign(swalPopup.style, customSwalStyle);
        }
      },
      inputLabel: "Motivo de eliminación",
      inputValue: descripcion,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) return "El motivo es obligatorio.";
      },
    }).then(async (result) => {
      if (result.isConfirmed) {

        eliminarPeticion(solicitud.id, result.value);
        
        Swal.fire("Eliminado", "El seguimiento ha sido eliminado.", "success");
        navigate("/cliente");
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Detalles de la Solicitud</h2>

      {/* Información de la Solicitud */}
      <section className="mt-4">
        <h4>Información de la Solicitud</h4>
        <p>
          <strong>Descripción:</strong> {solicitud.descripcion}
        </p>
        <p>
          <strong>Fecha de Solicitud:</strong>{" "}
          {new Date(solicitud.fechaSolicitud).toLocaleString()}
        </p>
        <p>
          <strong>Fecha de Cierre:</strong>{" "}
          {new Date(solicitud.fechaCierre).toLocaleString()}
        </p>
        <p>
          <strong>Estatus:</strong>{" "}
          {solicitud.estatus === 3 ? "Cerrada" : "Activa"}
        </p>
        <p>
          <strong>Valoración:</strong> {solicitud.valoracion}
        </p>
        <p>
          <strong>Mensaje de Valoración:</strong> {solicitud.mensajeValoracion}
        </p>
      </section>

      {/* Categoría de la Solicitud */}
      <section className="mt-4">
        <h4>Categoría de la Solicitud</h4>
        <p>
          <strong>Nombre:</strong> {solicitud.categoriaAsistencia.nombre}
        </p>
        <p>
          <strong>Estatus:</strong>{" "}
          {solicitud.categoriaAsistencia.estatus ? "Activo" : "Inactivo"}
        </p>
      </section>

      {/* Datos del Agente */}
      <section className="mt-4">
        <h4>Datos del Agente</h4>
        <p>
          <strong>Nombre:</strong> {solicitud.agenteVenta.fullName}
        </p>
        <p>
          <strong>Email:</strong> {solicitud.agenteVenta.email}
        </p>
        <p>
          <strong>Username:</strong> {solicitud.agenteVenta.userName}
        </p>
      </section>

      {/* Seguimientos */}
      <section className="mt-4">
        <h4>Seguimientos</h4>
        {solicitud.seguimientosSolicitudAsistencia.length > 0 ? (
          solicitud.seguimientosSolicitudAsistencia.map((seguimiento) => (
            <div key={seguimiento.id} className="card mt-2">
              <div className="card-body">
                <p>
                  <strong>Descripción:</strong> {seguimiento.descripcion}
                </p>
                <p>
                  <strong>Fecha de Seguimiento:</strong>{" "}
                  {new Date(seguimiento.fechaSeguimiento).toLocaleString()}
                </p>
                <p>
                  <strong>Mensaje:</strong> {seguimiento.mensaje}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay seguimientos registrados.</p>
        )}
      </section>
      <button className="btn btn-danger mt-2" onClick={eliminarSolicitud}>Eliminar Solicitud de Asistencia</button>
    </div>
  );
};

export default DetallesSolicitud;
