import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsuario } from "../context/ProvedorUsuario";
import CrearPedido from "../components/CrearPedido";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/dashboard.css";
import { useEffect } from "react";

export default function Dashboard() {
  const { usuario, crearUsuario, eliminarUsuario, cargando } = useUsuario();
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const orders = {
    creadas: [
      {
        id: 1,
        tipo: "Paquete",
        nombreCLiente: "Carlos Gómez",
        desde: {
          name: "Medellín Centro",
          ubi: "Avenida 45 #12-34",
        },
        hasta: {
          name: "Vereda La Esperanza",
          ubi: "Calle 123 #45-67",
        },
        fecha: "2025-12-10",
        notas: "Compras: -10m de manguera -5kg de fertilizante.",
      },

      {
        id: 2,
        tipo: "Sobre",
        nombreCLiente: "María Restrepo",
        desde: {
          name: "Rionegro Plaza",
          ubi: "Carrera 22 #31-08",
        },
        hasta: {
          name: "Vereda El Carmelo",
          ubi: "Sector La Cascada, Casa 7",
        },
        fecha: "2025-12-11",
        notas: "Entrega de documentos médicos.",
      },
    ],
    pendientes: [
      {
        id: 3,
        tipo: "Paquete",
        nombreCLiente: "Juan Pablo Vélez",
        desde: {
          name: "La Ceja Centro",
          ubi: "Calle 15 #18-50",
        },
        hasta: {
          name: "Vereda El Higuerón",
          ubi: "Entrada por la finca La Palma",
        },
        fecha: "2025-12-09",
        notas: "Compras: -1 saco de concentrado -herramientas pequeñas.",
      },
    ],
    completadas: [
      {
        id: 4,
        tipo: "Exclusivo",
        nombreCLiente: "Doña Rosalba Quintero",
        desde: {
          name: "Marinilla Mercado",
          ubi: "Carrera 30 #20-12",
        },
        hasta: {
          name: "Vereda La Honda",
          ubi: "Finca El Encanto",
        },
        fecha: "2025-12-08",
        notas: "Carga grande: -2 bultos de maíz -materiales para corral.",
      },

      {
        id: 5,
        tipo: "Paquete",
        nombreCLiente: "Andrés Montoya",
        desde: {
          name: "Guarne Centro",
          ubi: "Calle 32 #14-22",
        },
        hasta: {
          name: "Vereda La Brizuela",
          ubi: "Sector La Loma, casa azul",
        },
        fecha: "2025-12-12",
        notas: "Mercado semanal: arroz, panela, verduras.",
      },

      {
        id: 6,
        tipo: "Sobre",
        nombreCLiente: "Luz Elena Castaño",
        desde: {
          name: "San Antonio de Pereira",
          ubi: "Parque principal, kiosco 4",
        },
        hasta: {
          name: "Vereda Llanogrande",
          ubi: "Portón café, kilómetro 3",
        },
        fecha: "2025-12-13",
        notas: "Sobre con facturas y papeles de la finca.",
      },
    ],
  };

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  console.log("Usuario en Dashboard:", usuario?.username);

  return (
    <div className="dashboard">
      <DashboardHeader user={usuario?.username} onLogOut={eliminarUsuario} />

      <button className="btn-nuevo" onClick={() => setModalOpen(true)}>
        Crear Pedido
      </button>

      <div className="orders-container">
        <div className="order-section">
          <h3>Órdenes creadas</h3>
          {orders.creadas.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>

        <div className="order-section">
          <h3>Órdenes pendientes</h3>
          {orders.pendientes.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>

        <div className="order-section">
          <h3>Órdenes completadas</h3>
          {orders.completadas.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>
      </div>

      <CrearPedido
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => console.log("Pedido creado:", data)}
      />
    </div>
  );
}

function OrderCard({ data }) {
  return (
    <div className="order-card">
      <div className="order-info">
        <h4>{data.nombreCLiente}</h4>
        <p>
          <strong>Tipo:</strong> {data.tipo}
        </p>
        <p>
          <strong>{data.desde.name}</strong> <br />
          <span>{data.desde.ubi}</span>
          <br />
          <strong>{data.hasta.name}</strong>
          <br />
          <span>{data.hasta.ubi}</span>
          <br />
        </p>
        <p>
          <strong>Fecha:</strong> {data.fecha}
        </p>
        <p className="order-notes">
          <strong>Notas:</strong> {data.notas}
        </p>
      </div>

      <div className="order-detalles">
        <img src="/VRD. Espinal - MED. Centro.png" alt="" />
        <button className="btn-outline small-btn">Ver detalles</button>
      </div>
    </div>
  );
}
