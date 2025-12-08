import { useState } from "react";
import ModalAuth from "./ModalAuth";
import Logo from "../icons/logo.jsx";
import Menu from "../icons/menu.jsx";
import Close from "../icons/close.jsx";
import "./../styles/header.css";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => {
    setInitialMode("login");
    setModalOpen(true);
    setMenuOpen(false);
  };

  const handleRegister = () => {
    setInitialMode("register");
    setModalOpen(true);
    setMenuOpen(false);
  };

  return (
    <div className="header">
      <div className="container-header">
        <a href="/" rel="noopener noreferrer" className="header-logo">
          <Logo />
          <div>Vereda Spress</div>
        </a>
        <nav>
          <div onClick={handleLogin}>Ingresar</div>
          <div onClick={handleRegister}>Registrarse</div>
        </nav>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Close /> : <Menu />}
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <div onClick={handleLogin}>Ingresar</div>
            <div onClick={handleRegister}>Registrarse</div>
          </div>
        )}
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
