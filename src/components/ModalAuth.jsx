import { useState, useEffect } from "react";
import "../styles/modalAuth.css";

export default function ModalAuth({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === "register" && fullName.trim().length < 3) {
      newErrors.fullName = "El nombre debe tener al menos 3 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (mode == "register" && password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (mode === "register" && password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (mode === "login") {
      console.log("Iniciar sesión con:", { email, password });
    } else {
      console.log("Registrar usuario:", { fullName, email, password });
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
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <span className="error-text">{errors.fullName}</span>
              )}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {mode === "register" && (
            <div>
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="btn-outline">
            {mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}

          <span onClick={switchMode} className="switch-link">
            {mode === "login" ? " Crear una" : " Iniciar sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}
