import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  servicioCrearUsuario,
  servicioObtenerUsuario,
} from "../services/servicioUsuario";

const ContextoUsuario = createContext();

export const useUsuario = () => useContext(ContextoUsuario);

const STORAGE_KEY = "datos_usuario";

export function ProveedorUsuario({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem(STORAGE_KEY);
    if (datos) {
      setUsuario(JSON.parse(datos));
      navigate("/dashboard");
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    }
  }, [usuario]);

  const obtenerUsuario = async (username, password) => {
    const res = await servicioObtenerUsuario({ username, password });
    setUsuario(res);
    return res;
  };

  const crearUsuario = async (nombre, correo, contraseña) => {
    const nuevoUsuario = {
      password: contraseña,
      username: nombre,
      email: correo,
    };

    const res = await servicioCrearUsuario(nuevoUsuario);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    setUsuario(res);

    return res;
  };

  const eliminarUsuario = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsuario(null);
  };

  return (
    <ContextoUsuario.Provider
      value={{
        usuario,
        cargando,
        crearUsuario,
        eliminarUsuario,
        obtenerUsuario,
      }}
    >
      {children}
    </ContextoUsuario.Provider>
  );
}
