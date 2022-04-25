<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="blueMinsal--text">Listado de avisos</h1>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-card class="my-8 px-6 py-6">
        <v-row class="pb-12" justify="space-between" align="center">
          <v-col order-md="2">
            <formulario />
          </v-col>
          <v-col cols="12" md="9" lg="10" order-md="1">
            <v-text-field
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="avisos"
          :items-per-page="5"
        >
          <template #[`item.activo`]="{ item }">
            <v-chip
              class="ma-2"
              :color="item.activo ? 'greenSuccess' : 'red'"
              pill
              small
              text-color="white"
            >
              {{ item.activo ? 'Activo' : 'Inactivo' }}
            </v-chip>
          </template>
          <template #[`item.opciones`]="{ item }">
            <v-tooltip bottom class="mx-2">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="blueMinsal"
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                >
                  mdi-eye
                </v-icon>
              </template>
              <span>Ver detalles</span>
            </v-tooltip>
            <v-tooltip bottom class="mx-2">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="blueMinsal"
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <app-actualizar-estado :estado="item.activo" modulo="aviso" />
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import formulario from './components/formulario.vue';

export default {
  name: 'Avisos',
  components: {
    formulario,
  },
  data: () => ({
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Descripción', value: 'descripcion' },
      { text: 'Tipo', value: 'tipo' },
      { text: 'Estado', value: 'activo' },
      { text: 'Opciones', value: 'opciones' },
    ],
    avisos: [
      {
        nombre: 'Establecimiento 1',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: true,
      },
      {
        nombre: 'Establecimiento 2',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: true,
      },
      {
        nombre: 'Establecimiento 3',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: true,
      },
      {
        nombre: 'Establecimiento 4',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: true,
      },
      {
        nombre: 'Establecimiento 5',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: true,
      },
      {
        nombre: 'Establecimiento 6',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: false,
      },
      {
        nombre: 'Establecimiento 7',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: false,
      },
      {
        nombre: 'Establecimiento 8',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: false,
      },
      {
        nombre: 'Establecimiento 9',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: false,
      },
      {
        nombre: 'Establecimiento 10',
        descripcion: 'Descripción',
        tipo: 'Tipo de aviso',
        activo: false,
      },
    ],
  }),
  methods: {},
};
</script>

<style scoped></style>
