/* eslint-disable import/no-unresolved */
const authRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './login'),
  },
  {
    path: '/recuperar-password',
    name: 'recuperar-password',
    component: () => import(/* webpackChunkName: "recuperarPassword" */ './recoverPassword'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "resetPassword" */ '../auth/resetPassword'),
  },
  {
    path: '/verify-mail/:token',
    name: 'verifyMail',
    component: () => import(/* webpackChunkName: "login" */ './verifyMail'),
  },
  {
    path: '/autenticacionqr',
    name: '2fa',
    component: () => import(/* webpackChunkName: "qr" */ './2fa'),
  },
];

export default authRouter;
