import "../styles/dashboard.css";
import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";

export default function Dashboard() {
  const [user] = useState({ name: "Juan Pérez" });

  // Datos de ejemplo (dummy)
  const orders = {
    creadas: [
      {
        id: 1,
        tipo: "Paquete",
        estado: "Creada",
        desde: "Vereda La Esperanza",
        hasta: "Medellín",
        fecha: "2025-12-05",
        notas: "Listo para recoger.",
      },
    ],
    pendientes: [
      {
        id: 2,
        tipo: "Sobre",
        estado: "Pendiente",
        desde: "Santa Fe",
        hasta: "Envigado",
        fecha: "2025-12-03",
        notas: "Entrega programada para mañana.",
      },
    ],
    completadas: [
      {
        id: 3,
        tipo: "Exclusivo",
        estado: "Completada",
        desde: "Rionegro",
        hasta: "Bello",
        fecha: "2025-12-01",
        notas: "Entregado sin novedades.",
      },
    ],
  };

  return (
    <div className="dashboard">
      <DashboardHeader user={user} />

      {/* TÍTULO */}
      <h2 className="section-title">Mis Entregas</h2>

      {/* BOTÓN CREAR */}
      <button className="btn-outline new-delivery-btn">
        Crear nueva entrega
      </button>

      {/* SECCIÓN – LISTADO VERTICAL */}
      <div className="orders-container">
        {/* ÓRDENES CREADAS */}
        <div className="order-section">
          <h3>Órdenes creadas</h3>
          {orders.creadas.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>

        {/* ÓRDENES PENDIENTES */}
        <div className="order-section">
          <h3>Órdenes pendientes</h3>
          {orders.pendientes.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>

        {/* ÓRDENES COMPLETADAS */}
        <div className="order-section">
          <h3>Órdenes completadas</h3>
          {orders.completadas.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ data }) {
  return (
    <div className="order-card">
      <p>
        <strong>Tipo:</strong> {data.tipo}
      </p>
      <p>
        <strong>Estado:</strong> {data.estado}
      </p>
      <p>
        <strong>De → Para:</strong> {data.desde} → {data.hasta}
      </p>
      <p>
        <strong>Fecha:</strong> {data.fecha}
      </p>
      <p className="order-notes">
        <strong>Notas:</strong> {data.notas}
      </p>

      <button className="btn-outline small-btn">Ver detalles</button>
    </div>
  );
}
