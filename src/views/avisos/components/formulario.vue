<template>
  <v-dialog v-model="dialog" max-width="920">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="2" rounded color="blueMinsal" v-bind="attrs" v-on="on">
        <v-icon color="white">mdi-plus-circle</v-icon>
        <span class="bgWhite--text px-2">Agregar</span>
      </v-btn>
    </template>
    <v-card rounded="xl" color="cardBg">
      <v-card-title class="px-0 w-full">
        <div class="blueMinsal--text text-center px-4 pb-4 text-center w-full">
          Crear aviso
        </div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                filled
                rounded
                dense
                label="Nombre *"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                label="Logo *"
                filled
                rounded
                dense
                hint="Cargar un archivo en formato JPG y como tamaño máximo 10MB"
                prepend-inner-icon="mdi-paperclip"
                prepend-icon=""
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                filled
                rounded
                dense
                label="Categoría"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <app-rich-textbox />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="py-6">
        <v-btn
          text
          color="blueMinsal"
          small
          rounded
          @click="dialog = false"
        >Cancelar</v-btn>
        <v-btn
          @click="dialog = false"
          rounded
          small
          color="blueMinsal"
          class="bgWhite--text px-4"
        ><b>Guardar</b></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'formularioAviso',
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped>
.w-full {
  width: 100% !important;
}
</style>
