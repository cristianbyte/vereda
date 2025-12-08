const API = "http://localhost:8080/api/v0/usuarios";

export async function servicioCrearUsuario(data) {
  try {
    const response = await fetch(`${API}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    console.log("Server response:", responseData);
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Error details:", responseData);
      throw new Error(responseData.message || "Error al crear usuario");
    }

    return responseData;
  } catch (error) {
    console.error("Error en crearUsuario:", error);
    throw error;
  }
}

export async function servicioObtenerUsuario(data) {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    console.log("Server response:", responseData);
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Error details:", responseData);
      throw new Error(responseData.message || "Error al obtener usuario");
    }

    return responseData;
  } catch (error) {
    console.error("Error en obtenerUsuario:", error);
    throw error;
  }
}
