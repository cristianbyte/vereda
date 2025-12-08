import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUsuario } from "../context/ProvedorUsuario";
import "../styles/modalAuth.css";

export default function ModalAuth({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const navigate = useNavigate();
  const { usuario, cargando, obtenerUsuario, crearUsuario } = useUsuario();

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

    if (!fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
    } else if (mode === "register" && fullName.trim().length < 3) {
      newErrors.fullName = "El nombre debe tener al menos 3 caracteres";
    }
    // EMAIL: solo en REGISTER
    if (mode === "register") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        newErrors.email = "El correo es requerido";
      } else if (!emailRegex.test(email)) {
        newErrors.email = "Correo electrónico inválido";
      }
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (mode === "register" && password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    // CONFIRMAR PASSWORD: solo en REGISTER
    if (mode === "register" && password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    if (mode === "login") {
      let res;
      try {
        res = await obtenerUsuario(fullName, password);

        navigate("/dashboard");
      } catch (error) {
        setErrors({ password: "Nombre o contraseña incorrectos" });
        console.error(error);
      }
    } else {
      const res = await crearUsuario(fullName, email, password);
      res && navigate("/dashboard");
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
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          {mode === "register" && (
            <div>
              <input
                type="text"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>
          )}

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
