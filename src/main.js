/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import './plugins/axios';
import './plugins/http_client';
import './plugins/utils';
import './assets/scss/variables.scss';

import VueMask, { VueMaskFilter } from 'v-mask';
import momentTime from 'moment-timezone';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/tiptap_vuetify';

import './services';

import { regComponents } from '@/modules/utils/regComponents';

Vue.use(Vuelidate);

const moment = require('moment');
require('moment/locale/es');

regComponents(Vue);

Vue.use(require('vue-moment'), {
  moment,
  momentTime,
});

Vue.use(VueMask);
Vue.filter('VMask', VueMaskFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    const token = localStorage.getItem('token');
    if (token) store.commit('setToken', token);
  },
  render: (h) => h(App),
}).$mount('#app');
