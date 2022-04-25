<template>
  <v-container>
    <h1 class="blueMinsal--text">Listado de Establecimientos</h1>
    <v-divider></v-divider>
    <br /><br />
    <v-card color="bgWhite" rounded="xl" class="px-6 py-6">
      <v-row justify="end">
        <v-col cols="2">
          <formulario :categorias="categorias" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Nombre"
            append-icon="mdi-magnify"
            clearable
            @input="searchEstablecimientos"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            label="Categoría"
            append-icon="mdi-shape"
            :items="categorias"
            item-text="nombre"
            item-value="id"
            clearable
            @change="searchCategoria"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="trueFalse"
            label="Activo"
            item-text="text"
            item-value="value"
            clearable
            @change="searchActivo"
          ></v-select>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="establecimientos"
        :options.sync="options"
        :server-items-length="totalItems"
      >
        <template #[`item.categoria`]="{ item }">
          <span v-if="item.category.length > 0">{{
            item.category.map((c) => c.nombre).join(', ')
          }}</span>
          <span v-else>N/A</span>
        </template>
        <template #[`item.activo`]="{ item }">
          <v-chip :color="item.activo ? 'green' : 'red'" class="white--text">{{ item.activo ? 'A' : 'Ina' }}ctivo</v-chip>
        </template>
        <template #[`item.acciones`]="{ item }">
          <app-cambiar-estado modelo="establecimiento" :activo="item.activo" @cambiarEstado="cambiarEstado(item.id)" class="mx-2" />
          <formulario :categorias="categorias" class="mx-2" :item="item" />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import formulario from './components/formulario.vue';

export default {
  name: 'Establecimientos',
  components: {
    formulario,
  },
  data: () => ({
    options: {},
    headers: [
      { text: 'Nombre', value: 'nombre', sortable: false },
      { text: 'Categorías', value: 'categoria', sortable: false },
      { text: 'Estado', value: 'activo', sortable: false },
      { text: 'Acciones', value: 'acciones', sortable: false },
    ],
    categorias: [],
    trueFalse: [
      { text: 'Activo', value: 1 },
      { text: 'Inactivo', value: 0 },
    ],
  }),
  watch: {
    options: {
      handler() {
        this.setPagina(this.options?.page || 1);
        this.setCantidadPorPagina(this.options?.itemsPerPage || 10);
        this.obtenerEstablecimientos();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('establecimientos', ['getEstablecimientos']),
    ...mapMutations('establecimientos', [
      'setPagina',
      'setNombre',
      'setActivo',
      'setIdCategoria',
      'setCantidadPorPagina',
    ]),
    async obtenerEstablecimientos() {
      this.showLoader();

      await this.getEstablecimientos();

      this.hideLoader();
    },
    async searchEstablecimientos(event) {
      this.setNombre(event);
      await this.obtenerEstablecimientos();
    },
    async searchCategoria(event) {
      this.setIdCategoria(event);
      await this.obtenerEstablecimientos();
    },
    async getCategorias() {
      this.showLoader();

      const resp = await this.services.categorias.getCategorias();
      this.categorias = resp?.data;

      this.hideLoader();
    },
    async searchActivo(event) {
      this.setActivo(event);
      await this.obtenerEstablecimientos();
    },
    async cambiarEstado(id) {
      this.showLoader();
      await this.services.establecimientos.cambiarEstado(id);
      await this.obtenerEstablecimientos();
      this.hideLoader();
      this.temporalAlert({
        type: 'success',
        message: 'Estado cambiado correctamente',
        show: true,
      });
    },
  },
  computed: {
    ...mapState('establecimientos', [
      'establecimientos',
      'totalItems',
      'totalPages',
    ]),
  },
  async created() {
    await Promise.all([this.obtenerEstablecimientos(), this.getCategorias()]);
  },
};
</script>
