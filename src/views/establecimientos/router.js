const router = [
  {
    path: '/establecimientos',
    name: 'establecimientos',
    component: () => import(/* webpackChunkName: "establecimientos" */ './establecimientos.vue'),
  },
];

export default router;
