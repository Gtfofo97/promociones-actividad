const promocionesRouter = [
  {
    path: '/promociones',
    name: 'promociones',
    component: () => import(/* webpackChunkName: "promociones" */ './promociones.vue'),
  },
];

export default promocionesRouter;
