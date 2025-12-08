import { useUsuario } from "../context/ProvedorUsuario";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import CrearPedido from "../components/CrearPedido";
import WhatsApp from "../icons/whatsapp.jsx";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { usuario, crearUsuario, eliminarUsuario, cargando } = useUsuario();
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const whatsappClick = (text) => {
    const phoneNumber = "573157703322";
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  const orders = {
    creadas: [
      // {
      //   id: 1,
      //   tipo: "Paquete",
      //   nombreCLiente: "Carlos Gómez",
      //   desde: {
      //     name: "Medellín Centro",
      //     ubi: "Avenida 45 #12-34",
      //   },
      //   hasta: {
      //     name: "Vereda La Esperanza",
      //     ubi: "Calle 123 #45-67",
      //   },
      //   fecha: "2025-12-10",
      //   notas: "Compras: -10m de manguera -5kg de fertilizante.",
      // },
    ],
    pendientes: [],
    completadas: [],
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
          {orders?.creadas.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>

        <div className="order-section">
          <h3>Órdenes pendientes</h3>
          {orders?.pendientes.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>

        <div className="order-section">
          <h3>Órdenes completadas</h3>
          {orders?.completadas.map((o) => (
            <OrderCard key={o.id} data={o} />
          ))}
        </div>
      </div>

      <CrearPedido
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => console.log("Pedido creado:", data)}
      />

      <button
        className="whatsapp-btn"
        onClick={() =>
          whatsappClick(
            `Hola mi nombre es ${usuario?.username}, necesito asistencia con mi pedido.`
          )
        }
      >
        <WhatsApp />
      </button>
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
