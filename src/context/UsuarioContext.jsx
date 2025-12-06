// contexts/UsuarioContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UsuarioContext = createContext();

export function ProveedorUsuario({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  const cargarDatosUsuario = async () => {
    try {
      const resultado = await window.storage.get("datos_usuario");
      if (resultado && resultado.value) {
        const datosUsuario = JSON.parse(resultado.value);
        setUsuario(datosUsuario);
      }
    } catch (error) {
      console.log("No hay usuario guardado");
    } finally {
      setCargando(false);
    }
  };

  const crearUsuario = async (nombre, correo) => {
    if (!nombre.trim() || !correo.trim()) {
      throw new Error("Todos los campos son requeridos");
    }

    const nuevoUsuario = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      fechaCreacion: new Date().toISOString(),
      ultimoAcceso: new Date().toISOString(),
    };

    try {
      await window.storage.set("datos_usuario", JSON.stringify(nuevoUsuario));
      setUsuario(nuevoUsuario);
      return nuevoUsuario;
    } catch (error) {
      throw new Error("Error al guardar usuario: " + error.message);
    }
  };

  const actualizarUltimoAcceso = async () => {
    if (!usuario) return;

    const usuarioActualizado = {
      ...usuario,
      ultimoAcceso: new Date().toISOString(),
    };

    try {
      await window.storage.set(
        "datos_usuario",
        JSON.stringify(usuarioActualizado)
      );
      setUsuario(usuarioActualizado);
      return usuarioActualizado;
    } catch (error) {
      throw new Error("Error al actualizar: " + error.message);
    }
  };

  const actualizarUsuario = async (datosNuevos) => {
    if (!usuario) return;

    const usuarioActualizado = {
      ...usuario,
      ...datosNuevos,
      ultimoAcceso: new Date().toISOString(),
    };

    try {
      await window.storage.set(
        "datos_usuario",
        JSON.stringify(usuarioActualizado)
      );
      setUsuario(usuarioActualizado);
      return usuarioActualizado;
    } catch (error) {
      throw new Error("Error al actualizar usuario: " + error.message);
    }
  };

  const eliminarUsuario = async () => {
    try {
      await window.storage.delete("datos_usuario");
      setUsuario(null);
    } catch (error) {
      throw new Error("Error al eliminar: " + error.message);
    }
  };

  const cerrarSesion = async () => {
    setUsuario(null);
  };

  const estaAutenticado = () => {
    return usuario !== null;
  };

  const valor = {
    email,
    usuario,
    ultimoAcceso,
    cerrarSesion,
    crearUsuario,
    actualizarUltimoAcceso,
    actualizarUsuario,
    eliminarUsuario,
    estaAutenticado,
    cargando,
  };

  return (
    <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext);
  if (!contexto) {
    throw new Error("useUsuario debe usarse dentro de ProveedorUsuario");
  }
  return contexto;
}
