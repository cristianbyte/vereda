import { useState } from "react";
import ShowMap from "./ShowMap";
import "../styles/crearPedido.css";

export default function CrearPedido({ isOpen, onClose, onSubmit }) {
  const userInfo = { name: "Juan Pérez" }; // Simulación de datos del usuario
  const [showMap, setShowMap] = useState(false);

  const [form, setForm] = useState({
    nombre: userInfo.name,
    tipo: "",
    destinoEscrito: "",
    fecha: "",
    notas: "",
  });

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
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Seleccionar tipo</option>
              <option value="Sobre">Papeles</option>
              <option value="Paquete">Paquete</option>
              <option value="Exclusivo">Exclusivo</option>
            </select>
          </div>

          {/* Remitente */}
          <div className="field">
            <label>Ubicación</label>
            <div className="destino-row">
              <input
                type="text"
                name="destinoEscrito"
                placeholder="Escribir dirección..."
                value={form.destinoEscrito}
                onChange={handleChange}
              />
              <button
                type="button"
                className="map-btn"
                onClick={() => setShowMap(true)}
              >
                📍
              </button>
            </div>
          </div>

          {showMap && <ShowMap setShowMap={setShowMap} />}

          {/* Destino */}
          <div className="field">
            <label>Destino</label>
            <div className="destino-row">
              <input
                type="text"
                name="destinoEscrito"
                placeholder="Escribir dirección..."
                value={form.destinoEscrito}
                onChange={handleChange}
              />
              <button
                type="button"
                className="map-btn"
                onClick={() => setShowMap(true)}
              >
                📍
              </button>
            </div>
          </div>

          {/* Fecha */}
          <div className="field">
            <label>Fecha del pedido</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
            />
          </div>

          {/* Notas */}
          <div className="field">
            <label>Notas</label>
            <textarea
              name="notas"
              placeholder="Escribe detalles adicionales del pedido..."
              value={form.notas}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Crear Pedido
          </button>
        </form>
      </div>
    </div>
  );
}
