<template>
  <v-dialog v-model="dialog" width="900">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="blueMinsal" v-bind="attrs" v-on="on" rounded v-if="Object.keys(item).length === 0">
        <v-icon color="white">mdi-plus-circle</v-icon>
        <span class="white--text">Agregar</span>
      </v-btn>
      <v-btn color="blueMinsal" v-bind="attrs" v-on="on" rounded v-else icon>
        <v-icon color="blueMinsal">mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6 blueMinsal--text">
        <h1>Crear establecimiento</h1>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              label="Categoría"
              filled
              rounded
              dense
              multiple
              :items="categorias"
              v-model="id_categoria"
              item-text="nombre"
              item-value="id"
              :error-messages="id_categoriaErrors"
              @change="$v.id_categoria.$touch()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Nombre"
              dense
              filled
              v-model="nombre"
              rounded
              :error-messages="nombreErrors"
              @input="$v.nombre.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox
              v-model="activo"
              label="Activo"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              dense
              filled
              rounded
              label="Logo *"
              v-model="logo"
              prepend-icon=""
              prepend-inner-icon="$file"
              hint="Cargar archivo con tamaño maximo de 15mb"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              dense
              filled
              rounded
              v-model="banner"
              label="Banner *"
              prepend-icon=""
              prepend-inner-icon="$file"
              hint="Cargar archivo con tamaño maximo de 15mb"
            ></v-file-input>
          </v-col>
        </v-row>

        <app-contactos ref="contactos" :contactosPadre="item.Contactos" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn class="white--text px-6" color="blueMinsal" rounded @click="postEstablecimiento"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'Formulario',
  props: {
    categorias: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  validations: {
    nombre: {
      required,
    },
    id_categoria: {
      required,
    },
  },
  data: () => ({
    dialog: false,
    nombre: null,
    id_categoria: null,
    activo: false,
    logo: null,
    banner: null,
  }),
  methods: {
    ...mapActions('establecimientos', ['getEstablecimientos']),
    async postEstablecimiento() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      const contactos = this.$refs.contactos.getContactosCargados();
      if (contactos.length === 0) {
        this.temporalAlert({
          show: true,
          type: 'error',
          message: 'Debe agregar por lo menos un contacto',
        });
        return;
      }

      this.showLoader();
      const data = {
        nombre: this.nombre,
        id_categorias: this.id_categoria,
        activo: this.activo,
        contactos,
      };

      try {
        let resp = null;
        if (Object.keys(this.item).length === 0) {
          resp = await this.services.establecimientos.postEstablecimientos(data);
        } else {
          resp = await this.services.establecimientos.putEstablecimientos(this.item.id, data);
        }

        if (this.logo) {
          await this.postFile(resp?.data?.id, 1, this.logo);
        }
        if (this.banner) {
          await this.postFile(resp?.data?.id, 2, this.banner);
        }

        await this.getEstablecimientos();

        this.$refs.contactos.resetContactos();
        this.nombre = null;
        this.id_categoria = null;
        this.activo = false;
        this.logo = null;
        this.banner = null;
        this.$v.$reset();

        this.temporalAlert({
          show: true,
          type: 'success',
          message: 'Establecimiento fue creado con éxito',
        });

        this.dialog = false;
      } catch (error) {
        this.temporalAlert({
          show: true,
          type: 'error',
          message: error.response?.data?.message || 'Sucedió un error',
        });
      } finally {
        this.hideLoader();
      }
    },
    async postFile(id, tipo, file) {
      const data = new FormData();
      data.append('file', file);
      data.append('id_tipo_archivo', tipo);

      await this.services.establecimientos.postFile(id, data);
    },
  },
  computed: {
    nombreErrors() {
      const errors = [];
      if (!this.$v.nombre.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.nombre.required && errors.push('El nombre es requerido');
      return errors;
    },
    id_categoriaErrors() {
      const errors = [];
      if (!this.$v.id_categoria.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.id_categoria.required && errors.push('La categoría es requerida');
      return errors;
    },
    logoErrors() {
      const errors = [];
      if (!this.$v.logo.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.logo.required && errors.push('El logo es requerido');
      return errors;
    },
    bannerErrors() {
      const errors = [];
      if (!this.$v.banner.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.banner.required && errors.push('El banner es requerido');
      return errors;
    },
  },
  created() {
    if (Object.keys(this.item).length === 0) return;

    this.nombre = this.item?.nombre;
    this.id_categoria = this.item?.category?.map((categoria) => categoria?.id);
    this.activo = this.item?.activo;
  },
};
</script>
