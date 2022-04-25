<template>
  <v-dialog v-model="dialog" max-width="920">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="2" rounded color="blueMinsal" v-bind="attrs" v-on="on">
        <v-icon color="white">mdi-plus-circle</v-icon>
        <span class="bgWhite--text px-2">Agregar</span>
      </v-btn>
    </template>
    <v-card rounded="xl">
      <v-card-title class="px-0 w-full">
        <div class="blueMinsal--text text-center px-4 pb-4 text-center w-full">
          Crear cupon/oferta
        </div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <v-autocomplete
                filled
                rounded
                dense
                label="Establecimiento*"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                filled
                rounded
                dense
                label="Sucursal"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                filled
                rounded
                dense
                label="Tipo*"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <appDatePicker></appDatePicker>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field filled rounded dense label="Código"></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field
                filled
                rounded
                dense
                label="Nombre *"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-checkbox
                  label="Activo"
                  value="Activo"
                ></v-checkbox>
              </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <br />
        <appRichTextbox></appRichTextbox>
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
import appRichTextbox from '../../../components/AppRichTextbox.vue';
import appDatePicker from '../../../components/AppDatePicker.vue';

export default {
  components: {
    appRichTextbox,
    appDatePicker,
  },
  name: 'formularioEstablecimiento',
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
