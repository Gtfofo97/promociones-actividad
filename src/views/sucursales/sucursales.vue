<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="blueMinsal--text">Listado de sucursales</h1>
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
            <formulario />
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="sucursales"
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
                  mdi-bullhorn
                </v-icon>
              </template>
              <span>Sucursales</span>
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
            <app-actualizar-estado :estado="item.activo" modulo="sucursal" />
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import formulario from './components/addEditForm.vue';

export default {
  name: 'Sucursales',
  components: {
    formulario,
  },
  data: () => ({
    buscar: null,
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Establecimiento', value: 'establecimiento' },
      { text: 'Departamento', value: 'departamento' },
      { text: 'Municipio', value: 'municipio' },
      { text: 'Estado', value: 'activo' },
      { text: 'Opciones', value: 'opciones' },
    ],
    sucursales: [
      {
        nombre: 'sucursal 1',
        establecimiento: 'Establecimiento 1',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: true,
      },
      {
        nombre: 'sucursal 2',
        establecimiento: 'Establecimiento 2',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: true,
      },
      {
        nombre: 'sucursal 3',
        establecimiento: 'Establecimiento 3',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: true,
      },
      {
        nombre: 'sucursal 4',
        establecimiento: 'Establecimiento 4',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: true,
      },
      {
        nombre: 'sucursal 5',
        establecimiento: 'Establecimiento 5',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: true,
      },
      {
        nombre: 'sucursal 6',
        establecimiento: 'Establecimiento 6',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: false,
      },
      {
        nombre: 'sucursal 7',
        establecimiento: 'Establecimiento 7',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: false,
      },
      {
        nombre: 'sucursal 8',
        establecimiento: 'Establecimiento 8',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: false,
      },
      {
        nombre: 'sucursal 9',
        establecimiento: 'Establecimiento 9',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: false,
      },
      {
        nombre: 'sucursal 10',
        establecimiento: 'Establecimiento 10',
        municipio: 'Municipio',
        departamento: 'Departamento',
        activo: false,
      },
    ],
  }),
  methods: {},
};
</script>

<style scoped></style>
