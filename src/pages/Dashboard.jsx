import { useUsuario } from "../context/ProvedorUsuario";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import CrearPedido from "../components/CrearPedido";
import WhatsApp from "../icons/whatsapp.jsx";
import "../styles/dashboard.css";
import {
  servicioCrearPedido,
  servicioObtenerPedidos,
} from "../services/servicioPedido.jsx";

export default function Dashboard() {
  const { usuario, crearUsuario, eliminarUsuario, cargando } = useUsuario();
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const creacionPedido = async (data) => {
    await servicioCrearPedido(data);
    console.log("pedido creado.");
  };

  const whatsappClick = (text) => {
    const phoneNumber = "573157703322";
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  const [orders, setOrders] = useState({
    creadas: [],
    pendientes: [],
    completadas: [],
  });

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  useEffect(() => {
    if (!usuario || !usuario.id) {
      console.log("Usuario no listo todavía...");
      return;
    }

    const cargarPedidos = async () => {
      try {
        console.log("usuarioid:", usuario.id);

        const respuesta = await servicioObtenerPedidos(usuario.id);
        console.log("RESPUESTA PEDIDOS:", respuesta);

        const nuevasOrders = {
          creadas: [],
          pendientes: [],
          completadas: [],
        };

        respuesta.forEach((p) => {
          switch (p.estado) {
            case "CREADO":
              nuevasOrders.creadas.push(p);
              break;

            case "PENDIENTE":
              nuevasOrders.pendientes.push(p);
              break;

            case "COMPLETADO":
              nuevasOrders.completadas.push(p);
              break;

            default:
              console.warn("Estado no reconocido:", p.estado);
          }
        });

        setOrders(nuevasOrders);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      }
    };

    cargarPedidos();
  }, [usuario]); // ← aquí va usuario

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
        onSubmit={(data) => {
          creacionPedido(data);
        }}
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
        <h4>{data.usuarioUsername}</h4>
        <div className={`estado-pago estado-${data.pagoId ?? "null"}`}>
          <span className="dot"></span>
          {data.pagoId == null || data.pagoId === 0
            ? "No pagado"
            : data.pagoId === 1
            ? "En proceso"
            : "Pagado"}
        </div>
        <p>
          <strong>Tipo:</strong> {data.servicioNombre}
        </p>
        <p>
          <strong>{data.localizacionEntrega}</strong> <br />
          {/* <span>{data.localizacionEntrega}</span> */}
          <br />
          <strong>{data.localizacionRecoleccion}</strong>
          <br />
          {/* <span>{data.localizacionRecoleccion}</span> */}
          <br />
        </p>
        <p>
          <strong>Fecha:</strong> {data.fechaEntrega}
        </p>
        <p className="order-notes">
          <strong>Notas:</strong> {data.notas}
        </p>
      </div>

      <div className="order-detalles">
        <img src="/VRD. Espinal - MED. Centro.png" alt="" />
      </div>
    </div>
  );
}
