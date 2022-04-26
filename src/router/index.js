/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueRouter from 'vue-router';
import authRouter from '../views/auth/router';
import adminRouter from '../views/administracion/router';
import establecimientosRouter from '../views/establecimientos/router';
import categoriasRouter from '../views/categorias/router';
import promocionesRouter from '../views/promociones/router';
import sucursalesRouter from '../views/sucursales/router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '../views/layout'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
      },
      ...adminRouter,
      ...establecimientosRouter,
      ...categoriasRouter,
      ...promocionesRouter,
      ...sucursalesRouter,
    ],
  },
  ...authRouter,
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import(/* webpackChunkName: "forbidden" */ '../views/forbidden'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// DESCOMENTAR CUANDO SE VALIDEN LAS RUTAS
// router.beforeEach(async (to, from, next) => {
//   if (to.fullPath === '/') {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       next('/login');
//       return;
//     }
//   }
//   if (await Vue.prototype.canNext(to)) {
//     next();
//   } else {
//     next({ name: 'Forbidden' });
//   }
// });

export default router;
