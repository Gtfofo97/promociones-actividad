<template>
  <v-app-bar app :elevation="0" color="blueGrayMinsal2" dense>
    <v-btn
      text
      icon
      @click.stop="setSibeBar(!sideBar)"
      color="darkGray"
      large
      v-if="!$vuetify.breakpoint.smAndDown"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <v-menu offset-y transition="scroll-y-transition" rounded="lg">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" elevation="" color="blueGrayMinsal2">
          <img
            :src="require(`@/assets/img/profile.svg`)"
            width="45%"
            height="auto"
          />
          {{ userDetail.email }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list dense nav>
        <v-list-item to="/perfil" class="my-0">
          <v-list-item-icon>
            <v-icon size="20">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="cerrarSession()" class="my-0">
          <v-list-item-icon>
            <v-icon size="20">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AppHeader',
  methods: {
    ...mapMutations('utils', ['setSibeBar', 'setMenu']),
    ...mapMutations(['setToken', 'setUserInfo']),
    async cerrarSession() {
      this.setMenu([]);
      this.setToken(null);
      localStorage.clear();
      this.$router.push('/login').catch(() => {});
    },
  },
  computed: {
    ...mapState(['userInfo', 'userDetail']),
    ...mapState('utils', {
      sideBar: 'sideBar',
    }),
  },
};
</script>

<style scoped></style>
