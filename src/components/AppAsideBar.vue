<template>
  <v-navigation-drawer
    app
    permanent
    stateless
    :class="sideBar ? 'px-0' : 'px-2'"
    :mini-variant="sideBar"
    mini-variant-width="70"
    color="blueMinsal"
    @input="setSibeBar($event)"
  >
    <template v-slot:prepend>
      <img
        :src="require(`@/assets/img/promociones.svg`)"
        width="95%"
        height="auto"
        v-if="!sideBar"
      />
      <v-list-item v-else two-line>
        <v-btn text icon x-large color="bgWhite"
          ><v-icon size="30">mdi-alpha-p-circle-outline</v-icon></v-btn
        >
      </v-list-item>
    </template>

    <v-list dense nav>
      <v-list-item
        v-for="(menu, j) in menu_parents"
        :key="j"
        :to="menu.uri"
        active-class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="bgWhite">{{ menu.icono }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="text-capitalize">
          <span class="white--text">{{ menu.nombre }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppAsideBar',
  props: {
    menu_parents: {
      type: Array,
      default: () => [
        {
          uri: '/',
          icono: 'mdi-view-dashboard-outline',
          nombre: 'Dashboard',
        },
        {
          uri: '/establecimientos',
          icono: 'mdi-storefront-outline',
          nombre: 'Establecimientos',
        },
        {
          uri: '/sucursales',
          icono: 'mdi-store',
          nombre: 'Sucursales',
        },
        {
          uri: '/promociones',
          icono: 'mdi-currency-usd',
          nombre: 'Promociones',
        },
        {
          uri: '/categorias',
          icono: 'mdi-shape',
          nombre: 'Categorías',
        },
        {
          uri: '/avisos',
          icono: 'mdi-bullhorn',
          nombre: 'Avisos',
        },
      ],
    },
  },
  data: () => ({}),
  methods: {
    ...mapMutations('utils', ['setSibeBar']),
  },
  computed: {
    ...mapState('utils', ['sideBar']),
  },
};
</script>

<style scoped>
.v-list-item.v-list-item--link:hover {
  background: white !important;
  color: #3C4557 !important;
}

.v-list-item.v-list-item--link:hover .v-icon.mdi.bgWhite--text,
.v-list-item.v-list-item--link:hover span.white--text {
  color: #3C4557 !important;
}
</style>
