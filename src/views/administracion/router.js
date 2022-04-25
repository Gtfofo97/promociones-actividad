const adminRouter = [
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import(/* webpackChunkName: "perfil" */ './perfil.vue'),
  },
  {
    path: '/seguridad',
    name: 'seguridad',
    component: () => import(/* webpackChunkName: "seguridad" */ './seguridad.vue'),
  },
];

export default adminRouter;
