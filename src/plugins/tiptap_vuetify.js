import Vue from 'vue';
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import vuetify from './vuetify';
import 'tiptap-vuetify/dist/main.css';

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi',
});
