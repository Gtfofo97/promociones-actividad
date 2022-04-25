const sucursalesRouter = [
  {
    path: '/sucursales',
    name: 'sucursales',
    component: () => import(/* webpackChunkName: "sucursales" */ './sucursales.vue'),
  },
];

export default sucursalesRouter;
