<template>
  <v-dialog v-model="dialog" max-width="920">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="2"
        rounded
        color="blueMinsal"
        v-bind="attrs"
        v-on="on"
        v-if="!id_establecimiento"
      >
        <v-icon color="white">mdi-plus-circle</v-icon>
        <span class="bgWhite--text px-2">Agregar</span>
      </v-btn>
      <v-btn v-bind="attrs" v-on="on" icon v-else>
        <v-icon color="blueMinsal" class="mx-2">
          mdi-store
        </v-icon>
      </v-btn>
    </template>
    <v-card rounded="xl" color="cardBg">
      <v-card-title class="px-0 w-full">
        <div class="blueMinsal--text text-center px-4 pb-4 text-center w-full">
          Crear sucursal
        </div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6" v-if="!id_establecimiento">
              <v-autocomplete
                filled
                rounded
                dense
                label="Establecimiento"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                filled
                rounded
                dense
                label="Nombre *"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                filled
                rounded
                dense
                label="Departamento"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                filled
                rounded
                dense
                label="Municipio"
              ></v-autocomplete>

              <v-text-field
                filled
                rounded
                dense
                label="Url Ubicación maps *"
                v-if="id_establecimiento"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="!id_establecimiento">
              <v-text-field
                filled
                rounded
                dense
                label="Url Ubicación maps *"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea filled label="Dirección *" dense rounded></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <br />
        <app-crud-contactos modulo="sucursal" />
        <br>
        <v-divider></v-divider>
        <br>
        <v-data-table
          :headers="headers"
          :items="sucursales"
          :hide-default-footer="true"
          :items-per-page="150"
          class="elevation-1"
        >
          <template #[`item.opciones`]>
            <v-btn icon color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="py-6 justify-center">
        <v-btn text color="blueMinsal" small rounded @click="dialog = false"
          >Cancelar</v-btn
        >
        <v-btn
          @click="dialog = false"
          rounded
          small
          color="blueMinsal"
          class="bgWhite--text px-4"
          ><b>Guardar</b></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'formulariosucursal',
  props: {
    id_establecimiento: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    sucursales: [
      {
        nombre: 'sucursal',
        departamento: 'departamento',
        municipio: 'municipio',
        direccion: 'direccion',
      },
    ],
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Departamento', value: 'departamento' },
      { text: 'Municipio', value: 'municipio' },
      { text: 'Dirección', value: 'direccion' },
      { text: 'Opciones', value: 'opciones' },
    ],
  }),
};
</script>

<style scoped>
.w-full {
  width: 100% !important;
}

.theme--light.v-data-table {
  background-color: #E0E5F1 !important;
}
</style>
