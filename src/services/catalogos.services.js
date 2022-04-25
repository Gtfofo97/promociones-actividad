import { httpClient } from '../plugins/http_client';

const getTipoArchivo = async () => await httpClient('/api/v1/catalogos/tipo-archivo');

const getTipoAviso = async () => await httpClient('/api/v1/catalogos/tipo-aviso');

const getTipoContacto = async () => await httpClient('/api/v1/catalogos/tipo-contacto');

const getTipoPromocion = async () => await httpClient('/api/v1/catalogos/tipo-promocion');

export {
  getTipoArchivo,
  getTipoAviso,
  getTipoContacto,
  getTipoPromocion,
};
