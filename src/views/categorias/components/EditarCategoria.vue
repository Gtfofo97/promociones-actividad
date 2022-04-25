<template>
  <v-dialog v-model="dialog" max-width="30%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blueMinsal" rounded v-bind="attrs" v-on="on">
        <v-icon color="white">mdi-plus-circle</v-icon>
        <span class="bgWhite--text px-2">Agregar</span>
      </v-btn>
    </template>
    <v-card color="cardBg" rounded="xl">
      <v-card-title class="justify-center">
        <span class="text-h5 primary--text">Categoria</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Nombre*"
                rounded
                required
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Descripción" rounded filled></v-textarea>
            </v-col>
            <v-col cols="12">
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
            <v-col cols="12">
              <v-file-input
                label="Banner *"
                filled
                rounded
                dense
                hint="Cargar un archivo en formato JPG y como tamaño máximo 10MB"
                prepend-inner-icon="mdi-paperclip"
                prepend-icon=""
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Establecimiento*"
                rounded
                filled
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-checkbox label="Activo" value="Activo"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" text rounded @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn class="primary" rounded @click="dialog = false"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'EditarCategoria',
  data: () => ({
    dialog: false,
  }),
};
</script>
