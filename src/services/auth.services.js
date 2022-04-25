import { httpClient } from '../plugins/http_client';

const usersUpdateEmail = async (data) => await httpClient('/api/v1/users/update/email', data, 'put');

const usersUpdatePassword = async (data) => await httpClient('/api/v1/users/update/password', data, 'put');

const metodosAutenticacionUsuario = async () => await httpClient('/api/v1/users/metodos-autenticacion-usuario');

const users2faAdd = async (data) => await httpClient('/api/v1/users/2fa/add', data, 'post');

const eliminarMetodo = async (data) => await httpClient('/api/v1/eliminar_metodo', data, 'delete');

const users2faMethodUpdate = async (data) => await httpClient('/api/v1/users/2fa/method/update', data, 'post');

const users2faAddVerify = async (data) => await httpClient('/api/v1/users/2fa/add/verify', data, 'post');

const twoFa = async (data, headers) => await httpClient('/api/v1/2fa', data, 'post', headers);

const twoFaCheck = async (data, headers) => await httpClient('/api/v1/2fa/check', data, 'post', headers);

const login = async (data) => await httpClient('/api/v1/login', data, 'post');

const recoveryPassword = async (email) => await httpClient('/api/v1/mail/password', { email }, 'post');

const recoveryChecktoken = async (headers) => await httpClient('/api/recovery/checktoken', null, 'post', headers);

const recoveryPasswordChangePassword = async (data) => await httpClient('/api/v1/mail/password-reset', data, 'post');

const verificarUsuario = async (token) => await httpClient(`/api/v1/verificar-usuario/${token}`);

export {
  login,
  verificarUsuario,
  recoveryPasswordChangePassword,
  recoveryChecktoken,
  recoveryPassword,
  usersUpdateEmail,
  usersUpdatePassword,
  metodosAutenticacionUsuario,
  users2faAdd,
  eliminarMetodo,
  users2faMethodUpdate,
  users2faAddVerify,
  twoFa,
  twoFaCheck,
};
