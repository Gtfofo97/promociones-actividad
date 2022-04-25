import { httpClient } from '../plugins/http_client';

const getPromociones = async (filters) => await httpClient('/api/v1/promociones', filters);

const postPromociones = async (data) => await httpClient('/api/v1/promociones', data, 'POST');

const putPromociones = async (id, data) => await httpClient(`/api/v1/promociones/${id}`, data, 'PUT');

const cambiarEstado = async (id) => await httpClient(`/api/v1/promociones/${id}/cambiar-estado`, {}, 'PUT');

export {
  getPromociones,
  postPromociones,
  putPromociones,
  cambiarEstado,
};
