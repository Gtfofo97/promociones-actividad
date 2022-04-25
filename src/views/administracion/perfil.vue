<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fluid>
    <v-flex xs12 sm11 md11 lg10>
      <v-row class="pa-0 ma-0">
        <v-col cols="12" md="6" class="pt-0 px-0 px-sm-2">
          <v-card class="pa-4 pa-sm-8" elevation="3" rounded="lg">
            <p class="text-h5 text-center blueGrayMinsal--text">
              Datos de perfil
            </p>
            <v-row>
              <v-col>
                <p class="subtitle-2">Correo electrónico</p>
                <p class="body-1 grey--text">{{ datosPerfil.email }}</p>
              </v-col>
            </v-row>
            <v-divider class="mt-4"></v-divider>
            <div class="mt-4">
              <p class="title">Actualizar email</p>
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                v-model="email"
                :rules="emailRules"
                @blur="validEmail()"
                label="Email "
                outlined
                dense
              >
              </v-text-field>
              <div class="text-center">
                <v-btn
                  color="blueMinsal white--text"
                  rounded
                  @click="validEmail() ? (showEmailPasswordForm = true) : null"
                >
                  <v-icon class="mr-1">mdi-content-save</v-icon>
                  Guardar
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="pb-0 px-0 px-sm-2">
          <v-card class="pa-4 pa-sm-8" elevation="3" rounded="lg">
            <p class="text-h5 text-center blueGrayMinsal--text">
              Actualizar contraseña
            </p>
            <v-form @submit.prevent="cambiarPassword" ref="passwordChange">
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                v-model="password.value"
                label="Contraseña Actual"
                :type="password.show ? 'text' : 'password'"
                outlined
                dense
                :append-icon="
                  password.show ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                :rules="[
                  (v) => (v !== null && v !== '') || 'Este campo es requerido',
                ]"
                @click:append="password.show = !password.show"
                :error="password.state"
                :error-messages="password.message"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="newPassword"
                :rules="newPasswordRules"
                v-model="new_password.value"
                label="Nueva Contraseña"
                :type="new_password.show ? 'text' : 'password'"
                :append-icon="
                  new_password.show ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append="new_password.show = !new_password.show"
                outlined
                dense
                :error="new_password.state"
                :error-messages="new_password.message"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="confirmPassword"
                :rules="confirmPasswordRules"
                v-model="confirm_password.value"
                label="Confirmar Contraseña"
                :type="confirm_password.show ? 'text' : 'password'"
                outlined
                :append-icon="
                  confirm_password.show
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                dense
                @click:append="confirm_password.show = !confirm_password.show"
                :error="confirm_password.state"
                :error-messages="confirm_password.message"
              >
              </v-text-field>
              <v-card-actions class="flex justify-center pa-0">
                <div class="text-center">
                  <v-btn color="blueMinsal white--text" rounded type="submit">
                    <v-icon class="mr-1">mdi-content-save</v-icon>
                    Guardar
                  </v-btn>
                </div>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" md="6">
        <v-card class="pa-4 pa-sm-8" elevation="3" rounded="lg">
          <p class="text-h5 text-center blueGrayMinsal--text">
            Autenticación en dos pasos
          </p>

        </v-card>
      </v-col> -->
      </v-row></v-flex
    >
    <v-dialog
      v-model="showEmailPasswordForm"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card rounded="lg">
        <v-card-title>Ingrese su contraseña</v-card-title>
        <v-card-text class="pt-2 pb-0">
          <v-text-field
            v-model="emailPassword"
            label="Contraseña actual"
            outlined
            :type="emailPasswordShow ? 'password' : 'text'"
            :append-icon="
              emailPasswordShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            @click:append="emailPasswordShow = !emailPasswordShow"
            dense
            ref="emailPass"
            :rules="[
              (v) => (v !== null && v !== '') || 'Este campo es requerido',
            ]"
          >
            <template></template>
          </v-text-field>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn
            rounded
            color="blueMinsal"
            class="white--text"
            @click="validContraseñaEmail()"
            ><v-icon left>mdi-content-save</v-icon>GUARDAR</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/* eslint-disable max-len */

import { mapActions, mapMutations, mapState } from 'vuex';
import jwtDecode from 'jwt-decode';

export default {
  name: 'perfil',
  data: () => ({
    mailSwitch: false,
    password: {
      value: null,
      show: false,
      state: false,
      message: null,
    },
    emailPassword: null,
    showEmailPasswordForm: false,
    emailPasswordShow: true,
    new_password: {
      value: null,
      show: false,
      state: false,
      message: null,
    },
    confirm_password: {
      value: null,
      show: false,
      state: false,
      message: null,
    },
    email: null,
    emailRules: [
      (v) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/.test(
          v,
        ) || 'email no valido',
    ],
  }),
  methods: {
    ...mapActions(['getUserDetail']),
    ...mapMutations(['setUserInfo', 'setToken']),
    validContraseñaEmail() {
      if (this.$refs.emailPass.valid) {
        this.cambiarEmail();
      }
    },
    async cambiarEmail() {
      try {
        if (this.validEmail()) {
          await this.showLoader();
          const data = {
            email: this.email,
            password: this.emailPassword,
          };
          const response = await this.services.auth.usersUpdateEmail(data);
          const { token, refreshToken: refresh } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refresh_token', refresh);
          this.setToken(token);
          await this.setUserInfo(jwtDecode(token));
          this.showEmailPasswordForm = false;
          this.emailPassword = null;
          this.email = null;
          this.temporalAlert({
            show: true,
            message: 'Correo electrónico actualizado',
            type: 'success',
          });
        }
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: e.response.data.description || e.response.data.message,
          type: 'error',
        });
      } finally {
        await this.hideLoader();
      }
    },
    async cambiarPassword() {
      if (this.$refs.passwordChange.validate()) {
        try {
          this.showLoader();
          const data = {
            password_actual: this.password.value,
            password: this.new_password.value,
            confirm_password: this.confirm_password.value,
          };
          const response = await this.services.auth.usersUpdatePassword(data);
          this.temporalAlert({
            show: true,
            message: 'Contraseña actualizada',
            type: 'success',
          });
          const { token, refreshToken: refresh } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refresh_token', refresh);
          this.password.value = null;
          this.password.state = null;
          this.password.message = null;
          this.new_password.value = null;
          this.new_password.state = null;
          this.new_password.message = null;
          this.confirm_password.value = null;
          this.confirm_password.state = null;
          this.confirm_password.message = null;
        } catch (e) {
          this.temporalAlert({
            show: true,
            message: e.response.data.message,
            type: 'error',
          });
        } finally {
          this.hideLoader();
          this.$refs.passwordChange.reset();
        }
      }
      this.hideLoader();
    },
    feelback(errors) {
      errors.forEach((error) => {
        if (error.propiedad === 'new_password') {
          this.new_password.state = true;
          this.new_password.message = error.error;
        }
        if (error.propiedad === 'repeat_password') {
          this.confirm_password.state = true;
          this.confirm_password.message = error.error;
        }
      });
    },
    validEmail() {
      return this.isEmail(this.email);
    },
  },
  computed: {
    ...mapState(['userInfo', 'userDetail']),
    newPasswordRules() {
      return [
        (v) => (v !== null && v !== '') || 'Este campo es requerido',
        (v) => this.isPassword(v)
          || 'La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 caracter especial, 1 numero y minimo 8 caracteres',
      ];
    },
    confirmPasswordRules() {
      return [
        (v) => (v !== null && v !== '') || 'Este campo es requerido',
        (v) => this.isPassword(v)
          || 'La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 caracter especial, 1 numero y minimo 8 caracteres',
        (v) => v === this.new_password.value || 'Las contraseñas no coinciden',
      ];
    },

    datosPerfil() {
      const usuarioDummy = {
        email: 'dummy@mail.com',
        fecha_creacion: '1999-10-10T11:15:25Z',
        id_persona: '',
        primer_apellido: '',
        primer_nombre: '',
        segundo_apellido: '',
        segundo_nombre: '',
        ultima_conexion: '1999-10-11T09:09:28Z',
      };
      let usuario;
      if (Object.keys(this.userDetail).includes('email')) {
        usuario = this.userDetail;
      } else {
        usuario = usuarioDummy;
      }
      return usuario;
    },
  },
};
</script>

<style scoped></style>
