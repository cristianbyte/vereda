import { useState } from "react";
import ModalAuth from "./ModalAuth";
import Logo from "../icons/logo.jsx";
import "./../styles/header.css";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState("login");

  return (
    <div className="header">
      <div className="container-header">
        <a href="/" rel="noopener noreferrer">
          <Logo />
        </a>
        <nav>
          <div
            onClick={() => {
              setInitialMode("login");
              setModalOpen(true);
            }}
          >
            Ingresar
          </div>
          <div
            onClick={() => {
              setInitialMode("register");
              setModalOpen(true);
            }}
          >
            Registrarse
          </div>
        </nav>
      </div>
      {modalOpen && (
        <ModalAuth
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialMode={initialMode}
        />
      )}
    </div>
  );
}
