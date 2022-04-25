const categoriasRouter = [
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import(/* webpackChunkName: "categorias" */ './categorias.vue'),
  },
];

export default categoriasRouter;
