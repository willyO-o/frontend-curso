import api from "@/services/api";

export const storeServicio = async (datos) => {
  const respuesta = await api.post("/servicios", datos);

  return respuesta.data;
};

export const getServicio = async (id) => {
  const respuesta = await api.get("/servicios/" + id);
  return respuesta.data;
};

export const updateServicio = async (id, datos) => {
  const respuesta = await api.put("/servicios/" + id, datos);
  return respuesta.data;
};

export const deleteServicio = async (id) => {
  const respuesta = await api.delete("/servicios/" + id);
  return respuesta.data;
};
