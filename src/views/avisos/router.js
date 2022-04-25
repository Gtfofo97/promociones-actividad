const avisosRouter = [
  {
    path: '/avisos',
    name: 'avisos',
    component: () => import(/* webpackChunkName: "avisos" */ './avisos.vue'),
  },
];

export default avisosRouter;
