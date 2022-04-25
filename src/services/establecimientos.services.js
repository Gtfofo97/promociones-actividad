import { httpClient } from '../plugins/http_client';

const getEstablecimientos = async (filters) => await httpClient('/api/v1/establecimientos', filters);

const postEstablecimientos = async (data) => await httpClient('/api/v1/establecimientos', data, 'POST');

const postFile = async (id, data) => await httpClient(`/api/v1/establecimientos/${id}/uploadFile`, data, 'POST');

const cambiarEstado = async (id) => await httpClient(`/api/v1/establecimientos/${id}/cambiar-estado`, {}, 'PUT');

const putEstablecimientos = async (id, data) => await httpClient(`/api/v1/establecimientos/${id}`, data, 'PUT');

export {
  getEstablecimientos,
  postEstablecimientos,
  postFile,
  cambiarEstado,
  putEstablecimientos,
};
