<template>
<v-dialog v-model="dialog" width="300">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blueMinsal" icon v-bind="attrs" v-on="on" rounded>
        <v-icon color="blueMinsal">mdi-{{ activo ? 'check-circle' : 'cancel' }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6 blueMinsal--text">
        <b>Cambiar estado</b>
      </v-card-title>

      <v-card-text>
        <p>¿Está seguro de {{ activo ? '' : 'in' }}habilitar el {{ modelo }} seleccionado?</p>
        <p>Ya no estará visible en el sitio web</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn class="white--text px-6" color="blueMinsal" rounded @click="cambiarEstado"> Aceptar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppCambiarEstado',
  props: {
    modelo: {
      type: String,
      default: '',
    },
    activo: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    cambiarEstado() {
      this.$emit('cambiarEstado');
      this.dialog = false;
    },
  },
};
</script>
