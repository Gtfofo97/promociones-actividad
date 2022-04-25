<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    eager
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        solo
        rounded
        class="centered-input mt-5"
        v-model="fechaFormatted"
        placeholder="dd-mm-yyyy"
        persistent-hint
        v-bind="attrs"
        v-mask="'##-##-####'"
        v-on="on"
        :maxlength="10"
        :error-messages="fechaErrors"
      >
      </v-text-field>
    </template>
    <v-date-picker
      locale="es"
      v-model="fecha"
      no-title
      v-on="inputListeners"
      @input="menu = false"
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
/* eslint-disable prefer-object-spread */

import moment from 'moment';

export default {
  name: 'AppDatePicker',
  props: {
    fechaErrors: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    fecha: null,
    menu: false,
  }),
  computed: {
    fechaFormatted: {
      get() {
        return moment(this.fecha).format('DD-MM-YYYY');
      },
      set(value) {
        if (value) {
          if (!value.match(/^\d{2}-\d{2}-\d{4}$/)) return;
          this.fecha = moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD');
          const vm = this;
          vm.$emit('input', this.fecha);
        }
      },
    },
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          vm.$emit('input', event);
        },
      });
    },
  },
};
</script>
