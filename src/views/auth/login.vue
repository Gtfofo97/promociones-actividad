<template>
  <v-app class="bgMinsal">
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 lg4 xl3>
            <v-img
              class="mx-auto d-flex mb-2"
              src="@/assets/img/SIS-HAZUL.png"
              max-width="350"
            />
            <v-card class="pa-2 pa-sm-10" rounded="lg" :elevation="5">
              <p class="text-h5 text-center pt-5 blueGrayMinsal--text">
                Inicie sesión para continuar
              </p>
              <v-card :color="login_loader.color" dark v-if="dialog">
                <v-card-text>
                  <v-row dense class="pt-2 mr-4 white--text">
                    <v-col cols="2">
                      <v-progress-circular
                        v-if="login_loader.show"
                        size="30"
                        indeterminate
                        color="white"
                      ></v-progress-circular>
                      <v-icon v-else size="35">mdi-alert-circle</v-icon>
                    </v-col>
                    <v-col cols="10" class="text-wrap pt-2">
                      {{ login_loader.text }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-form @submit.prevent="login()">
                <v-card-text>
                  <v-text-field
                    append-icon="mdi-account"
                    name="login"
                    label="Usuario / Correo Electronico *"
                    type="text"
                    @keydown="cleanMail"
                    v-model="user"
                    :rules="userRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                  </v-text-field>
                  <v-text-field
                    append-icon="mdi-eye"
                    id="password"
                    name="password"
                    v-model="password"
                    label="Contraseña *"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="passwordRules"
                    :error="error"
                    :error-messages="error_message"
                  >
                    <template #append>
                      <v-icon
                        v-if="!showPassword"
                        @click="showPassword = !showPassword"
                        :color="error ? 'red' : ''"
                        >mdi-eye</v-icon
                      >
                      <v-icon
                        v-else
                        @click="showPassword = !showPassword"
                        :color="error ? 'red' : ''"
                        >mdi-eye-off</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-card-text>
                <v-row class="pt-5">
                  <v-col
                    cols="12"
                    md="6"
                    class="flex justify-center text-center"
                  >
                    <v-btn
                      color="blueMinsal white--text px-sm-8"
                      rounded
                      type="submit"
                      :loading="disabled"
                      >iniciar sesión</v-btn
                    >
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    class="flex justify-center text-center"
                  >
                    <v-btn
                      color="blueMinsal "
                      class="px-sm-8"
                      rounded
                      outlined
                      :to="'/register'"
                      >Registrarse</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row class="pa-0 ma-0">
                  <v-btn
                    text
                    style="text-transform: none"
                    color="blueMinsal"
                    class="mt-2 mx-auto"
                    rounded
                    to="/recuperar-password"
                    >Olvidaste tu contraseña?</v-btn
                  >
                </v-row>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-spacer class="my-10"></v-spacer>
    <v-footer class="text-center blueDarkMinsal py-3">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-img
            src="@/assets/img/escudo-white-minsal.png"
            width="200"
            class="mx-auto"
          />
        </v-col>
        <v-col
          class="text-center white--text font-weight-bold align-center"
          cols="12"
          sm="6"
          md="4"
        >
          <p class="ma-0 font-weight-thin">
            Ministerio de Salud <br />
            República de El Salvador, C.A <br />
            Calle Arce No. 827, San Salvador, El Salvador
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-img
            src="@/assets/img/SIS-HBLANCO.png"
            width="150"
            class="mx-auto"
          />
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import jwtDecode from 'jwt-decode';

export default {
  name: 'login',
  data: () => ({
    error: false,
    dialog: false,
    login_loader: {
      // deep-orange darken-4
      // validando usuario, por favor espere ...
      // Usuario o contraseña no validos
      // info
      text: null,
      show: null,
      color: null,
    },
    error_message: null,
    isValid: true,
    user: null,

    password: null,
    passwordRules: [(v) => (v !== null && v !== '') || 'Contraseña no valida'],
    showPassword: false,
    disabled: false,
  }),
  methods: {
    ...mapMutations(['setToken', 'setUserInfo']),
    cleanMail(e) {
      if (e.keyCode === 32) {
        e.preventDefault();
      }
    },
    async login() {
      if (!this.user || !this.password) {
        return;
      }
      this.dialog = true;
      this.login_loader.show = true;
      this.login_loader.color = 'blueMinsal';
      this.login_loader.text = 'validando usuario, por favor espere...';
      if (this.isValid) {
        this.disabled = true;
        try {
          const data = {
            email: this.user,
            password: this.password,
          };
          const response = await this.services.auth.login(data);
          if (response?.status === 200) {
            this.error = false;
            this.error_message = null;
            if (process.env.TWO_FACTOR_AUTH) {
              this.$router.push({
                name: '2fa',
                params: {
                  email: this.user,
                  token: response.data.token,
                  verified: response.data.verified,
                  metodos_autenticacion: response.data.metodos_autenticacion,
                },
              });
            } else {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refresh_token', response.data.refreshToken);
              this.setToken(response.data.token);
              this.setUserInfo(jwtDecode(response.data.token));
              this.$router.push('/');
            }
          }
        } catch (e) {
          this.temporalAlert({
            show: true,
            message: e.response.data.message
              ? e.response.data.message
              : 'El correo electrónico o la contraseña no son validos',
            type: 'error',
          });
          this.isValid = true;
          this.dialog = false;
        } finally {
          this.dialog = false;
          this.login_loader.show = false;
          this.disabled = false;
        }
      }
    },
    showAlert(message) {
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = 'success';
      setTimeout(() => {
        this.ocultarAlert();
      }, 2000);
    },
    ocultarAlert() {
      this.alert.show = !this.alert.show;
    },
  },
  computed: {
    userRules() {
      return [
        (v) => (v !== null && v !== '') || 'Este campo es requerido',
        (v) => this.isEmail(v) || 'Correo no válido',
      ];
    },
  },
  created() {
    localStorage.clear();
  },
};
</script>

<style scoped></style>
