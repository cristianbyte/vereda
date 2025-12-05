import { useState, useEffect } from "react";
import "../styles/modalAuth.css";

export default function ModalAuth({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // ← ahora sí correcto

  // Cada vez que abras el modal, actualiza el modo
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      console.log("Iniciar sesión...");
    } else {
      console.log("Crear cuenta...");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>{mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input type="text" placeholder="Nombre completo" required />
          )}

          <input type="email" placeholder="Correo electrónico" required />

          <input type="password" placeholder="Contraseña" required />

          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirmar contraseña"
              required
            />
          )}

          <button type="submit" className="btn-outline">
            {mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}

          <span onClick={switchMode} className="switch-link">
            {mode === "login" ? "Crear una" : "Iniciar sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}
