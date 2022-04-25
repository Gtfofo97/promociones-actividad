<template>
  <div>
    <h3><b class="blueMinsal--text">Contactos de establecimiento</b></h3>
    <br>
    <v-row>
      <v-col cols="12" md="4">
        <v-autocomplete
          label="Tipo contacto *"
          filled
          rounded
          dense
          :items="tipos"
          v-model="id_tipo"
          item-text="nombre"
          item-value="id"
          :error-messages="id_tipoErrors"
          @change="$v.id_tipo.$touch()"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          label="Contacto/url *"
          dense
          filled
          v-model="contacto"
          rounded
          :error-messages="contactoErrors"
          @change="$v.contacto.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="blueMinsal" rounded @click="agregarContacto">
          <v-icon color="white">mdi-plus-circle</v-icon>
          <span class="white--text">Agregar</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="contactos"
      :hide-default-footer="true"
      :items-per-page="100"
    >
      <template #[`item.acciones`]="{ item }">
        <v-btn icon rounded color="red" @click="quitarContacto(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AppContactos',
  props: {
    contactosPadre: {
      type: Array,
      default: () => [],
    },
  },
  validations: {
    contacto: {
      required,
    },
    id_tipo: {
      required,
    },
  },
  data: () => ({
    tipos: [],
    id_tipo: null,
    contacto: null,
    headers: [
      { text: 'Tipo contacto', value: 'tipo' },
      { text: 'Contacto', value: 'contacto' },
      { text: 'Acciones', value: 'acciones' },
    ],
    contactos: [],
  }),
  methods: {
    async getTipoContacto() {
      this.showLoader();

      const resp = await this.services.catalogos.getTipoContacto();
      this.tipos = resp?.data;

      this.hideLoader();
    },
    agregarContacto() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.contactos.push({
        id_tipo: this.id_tipo,
        tipo: this.tipos.find((tipo) => tipo.id === this.id_tipo).nombre,
        contacto: this.contacto,
      });

      this.contacto = null;
      this.id_tipo = null;
      this.$v.$reset();
    },
    quitarContacto(item) {
      this.contactos = this.contactos.filter((contacto) => contacto.id !== item.id);
    },
    getContactosCargados() {
      return this.contactos.map((contacto) => ({
        id_tipo_contacto: contacto.id_tipo,
        contacto: contacto.contacto,
      }));
    },
    resetContactos() {
      this.contactos = [];
    },
  },
  computed: {
    contactoErrors() {
      const errors = [];
      if (!this.$v.contacto.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.contacto.required && errors.push('El contacto es requerido');
      return errors;
    },
    id_tipoErrors() {
      const errors = [];
      if (!this.$v.id_tipo.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.id_tipo.required && errors.push('El tipo es requerido');
      return errors;
    },
  },
  async created() {
    await Promise.all([
      this.getTipoContacto(),
    ]);

    this.contactos = this.contactosPadre.map((contacto) => ({
      id_tipo: contacto.id_tipo_contacto,
      tipo: this.tipos.find((tipo) => tipo.id === contacto.id_tipo_contacto).nombre,
      contacto: contacto.contacto,
    }));
  },
};
</script>
