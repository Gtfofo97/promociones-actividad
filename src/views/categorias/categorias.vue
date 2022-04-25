<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="blueMinsal--text">Listado de categorías</h1>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-card class="my-8 px-6 py-6">
        <v-row class="pb-12" justify="space-between" align="center">
          <v-col cols="12" sm="3" md="3" lg="3">
            <v-text-field
              v-model="buscar"
              placeholder="Nombre..."
              append-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3">
            <v-text-field
              v-model="buscar"
              placeholder="Descripcion..."
              append-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3" lg="3">
            <v-text-field
              v-model="buscar"
              placeholder="Estado..."
              append-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <EditarCategoria />
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="desserts"
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
            <v-tooltip bottom class="mx-2" v-if="item.activo">
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
            <app-actualizar-estado :estado="item.activo" modulo="nombre" />
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import EditarCategoria from './components/EditarCategoria.vue';

export default {
  components: {
    EditarCategoria,
  },
  name: 'Categorias',
  props: [], // Solo si es necesario,
  validations: {},
  data: () => ({
    dialog: false,
    buscar: null,
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Descripcion', value: 'descripcion' },
      { text: 'Estado', value: 'activo' },
      { text: 'Opciones', value: 'opciones' },
    ],
    desserts: [
      {
        nombre: 'Frozen Yogurt',
        descripcion: 'Este es un ejemplo de descripción',
        activo: true,
      },
      {
        nombre: 'Ice cream sandwich',
        descripcion: 'Este es un ejemplo de descripción',
        activo: false,
      },
      {
        nombre: 'Eclair',
        descripcion: 'Este es un ejemplo de descripción',
        activo: true,
      },
    ],
  }),
  methods: {},
  computed: {},
  beforeCreate() {},
  beforeMount() {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
