import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalAuth from "../components/ModalAuth";
import { Carga, Paquete, Sobre } from "../icons/tipos.jsx";
import concepto from "/concept-mujer-entrega-canasta.png";
import "../styles/home.css";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState("login");

  const servicios = [
    {
      Icon: Sobre,
      title: "Sobre",
      description:
        "Envío rápido y seguro de documentos y cartas. Ideal para correspondencia urgente.",
    },
    {
      Icon: Paquete,
      title: "Paquete",
      description:
        "Transporte de paquetes medianos con seguimiento en tiempo real y entrega garantizada.",
    },
    {
      Icon: Carga,
      title: "Carga",
      description:
        "Soluciones para envíos de gran volumen. Servicio especializado para carga pesada.",
    },
  ];

  return (
    <div className="home">
      <Header />

      {modalOpen && (
        <ModalAuth
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialMode={initialMode}
        />
      )}

      {/* HERO */}

      <section className="hero">
        <div className="hero-container">
          <div className="derecha">
            <h1>Entrega entre el campo y la ciudad</h1>
            <p>
              Conectamos veredas, zonas rurales y pueblos con la ciudad de forma
              sencilla, rápida y confiable.
            </p>
            <button
              className="btn"
              onClick={() => {
                setInitialMode("login");
                setModalOpen(true);
              }}
            >
              Comenzar
            </button>
          </div>

          <div className="izquierda">
            <img src={concepto} alt="mujer canasta entrega" />
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="section">
        <h2>El problema que resolvemos</h2>
        <ul>
          <li>Dificultad de acceso a servicios de entrega en zonas rurales</li>
          <li>Costos altos entre municipios y ciudades</li>
          <li>Opciones de transporte lentas e inestables</li>
        </ul>
      </section>

      {/* TIPOS DE SERVICIO */}
      <section className="section">
        <h2>Tipos de servicio</h2>
        <div className="cards">
          {servicios.map((service, index) => (
            <div key={index} className="card">
              <div className="card-icon">
                <service.Icon />
              </div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARA QUIÉN ES */}
      <section className="section">
        <h2>¿Para quién es?</h2>
        <ul>
          <li>Agricultores y productores</li>
          <li>Emprendedores y pequeños negocios rurales</li>
          <li>
            Familias que envían o reciben artículos entre veredas y ciudad
          </li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}
