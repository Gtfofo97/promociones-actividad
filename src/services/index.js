import Vue from 'vue';
import * as auth from './auth.services';
import * as avisos from './avisos.services';
import * as catalogos from './catalogos.services';
import * as categorias from './categorias.services';
import * as establecimientos from './establecimientos.services';
import * as promociones from './promociones.services';
import * as sucursales from './sucursales.services';

Vue.prototype.services = {
  auth,
  avisos,
  catalogos,
  categorias,
  establecimientos,
  promociones,
  sucursales,
};
