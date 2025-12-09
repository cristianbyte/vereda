const API = "http://localhost:8080/api/v0/pedidos";

export async function servicioCrearPedido(data) {
  console.log("SENDINF:", data);
  try {
    const response = await fetch(`${API}`, {
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
      throw new Error(responseData.message || "Error al crear pedido");
    }

    return responseData;
  } catch (error) {
    console.error("Error en creacion de pedidos", error);
    throw error;
  }
}

export async function servicioObtenerPedidos(usuarioId) {
  try {
    const response = await fetch(`${API}/usuario/${usuarioId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    console.log("Server response:", responseData);
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Error details:", responseData);
      throw new Error(responseData.message || "Error al obtener info");
    }

    return responseData;
  } catch (error) {
    console.error("Error en Pedidos", error);
    throw error;
  }
}
