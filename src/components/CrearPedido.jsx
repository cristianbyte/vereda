import { useUsuario } from "../context/ProvedorUsuario";
import { useState, useEffect } from "react";
import ShowMap from "./ShowMap";
import Pin from "../icons/pin";
import "../styles/crearPedido.css";

export default function CrearPedido({ isOpen, onClose, onSubmit }) {
  const { usuario } = useUsuario();
  const [showMap, setShowMap] = useState(false);
  const hoy = new Date().toISOString().split("T")[0];
  const [fechaFormateada, setFechaFormateada] = useState("");

  const formatearFecha = (f) => {
    if (!f) return "";
    const [y, m, d] = f.split("-");
    return `${d}/${m}`;
  };

  const [form, setForm] = useState({
    usuarioId: usuario?.id,
    servicioId: "2",
    fechaEntrega: hoy,
    localizacionEntrega: "",
    localizacionRecoleccion: "",
    notas: "",
  });

  useEffect(() => {
    setFechaFormateada(formatearFecha(form.fechaEntrega));
    console.log("fecha cambio:", form.fechaEntrega);
  }, [form.fechaEntrega]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Crear Pedido</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          {/* Tipo */}
          <div className="field">
            <label>Tipo de pedido</label>
            <select
              name="servicioId"
              value={form.servicioId}
              onChange={handleChange}
            >
              <option value="2">Paquete</option>
              <option value="1">Sobre</option>
              <option value="3">Carga</option>
            </select>
          </div>

          {/* Origen */}
          <div className="field-row">
            <input
              type="text"
              name="localizacionRecoleccion"
              placeholder="Origen..."
              value={form.localizacionRecoleccion}
              onChange={handleChange}
            />
            <button
              type="button"
              className="map-btn"
              onClick={() => setShowMap(true)}
            >
              <Pin />
            </button>
          </div>

          {showMap && <ShowMap setShowMap={setShowMap} />}

          {/* Destino */}
          <div className="field-row">
            <input
              type="text"
              name="localizacionEntrega"
              placeholder="Destino..."
              value={form.localizacionEntrega}
              onChange={handleChange}
            />
            <button
              type="button"
              className="map-btn"
              onClick={() => setShowMap(true)}
            >
              <Pin />
            </button>
          </div>

          <div className="field-row">
            {/* Notas */}
            <div className="field">
              <textarea
                name="notas"
                placeholder="Detalles adicionales.."
                value={form.notas}
                onChange={handleChange}
                className="text-area"
              ></textarea>
            </div>
            {/* Fecha */}
            <div className="field">
              <input
                type="date"
                name="fechaEntrega"
                value={form.fechaEntrega}
                onChange={handleChange}
                min={hoy}
              />
              <div>{fechaFormateada}</div>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Crear Pedido
          </button>
        </form>
      </div>
    </div>
  );
}
