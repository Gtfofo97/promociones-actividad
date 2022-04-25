<template>
  <v-app>
    <v-main class="bgMinsal">
      <v-container fill-height justify-center fluid>
        <v-flex xs12 sm8 md6 lg4 xl3>
          <v-card class="rounded-lg px-2 px-sm-12 elevation-2">
            <v-card-title class="justify-center" primary-title
              >Reestablecer Contraseña</v-card-title
            >
            <v-card-text>
              <v-divider></v-divider>
              <v-row class="mt-6">
                <v-col cols="12" class="pa-0 ma-0 cols-12">
                  <v-text-field
                    id="new_pass"
                    prepend-icon="mdi-account"
                    name="new_pass"
                    readonly
                    :value="email"
                    label="Correo Electrónico"
                  ></v-text-field>
                </v-col>
                <v-col class="pa-0 ma-0 cols-12">
                  <v-text-field
                    id="new_pass"
                    prepend-icon="mdi-lock"
                    name="new_pass"
                    v-model="new_pass.value"
                    label="Contraseña nueva"
                    :rules="passwordRules"
                    :type="new_pass.show ? 'text' : 'password'"
                    :error="new_pass.error"
                    :error-messages="new_pass.error_msg"
                  >
                    <template #append>
                      <v-icon
                        v-if="new_pass.show === false"
                        @click="new_pass.show = !new_pass.show"
                        >mdi-eye-outline</v-icon
                      >
                      <v-icon v-else @click="new_pass.show = !new_pass.show"
                        >mdi-eye-off-outline</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0 ma-0">
                  <v-text-field
                    id="repeat_pass"
                    prepend-icon="mdi-lock-check"
                    name="repeat_pass"
                    v-model="repeat_pass.value"
                    label="Repita la contraseña"
                    :rules="passwordRules"
                    :type="repeat_pass.show ? 'text' : 'password'"
                    :error="repeat_pass.error"
                    :error-messages="repeat_pass.error_msg"
                  >
                    <template #append>
                      <v-icon
                        v-if="repeat_pass.show === false"
                        @click="repeat_pass.show = !repeat_pass.show"
                        >mdi-eye-outline</v-icon
                      >
                      <v-icon
                        v-else
                        @click="repeat_pass.show = !repeat_pass.show"
                        >mdi-eye-off-outline</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-space-around pb-5" width="100%">
              <v-btn
                color="blueMinsal white--text"
                :loading="loading"
                @click="changePassword"
                rounded
              >
                <v-icon left>mdi-content-save</v-icon>actualizar
              </v-btn>
              <v-divider vertical></v-divider>
              <router-link to="/login" class="blueMinsal--text"
                >O iniciar sesión</router-link
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    mostrarActualizar: null,
    email: null,
    success: false,
    error: false,
    loading: false,
    new_pass: {
      value: null,
      error: false,
      error_msg: '',
      show: false,
    },
    repeat_pass: {
      value: null,
      error: false,
      error_msg: '',
      show: false,
    },
  }),
  methods: {
    async checkToken() {
      try {
        // Obtenemos el token de la url actual
        const token = this.$route.params.id;
        // revisamos si el token aun no ha vencido realizando la siguiente peticion
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await this.services.auth.recoveryChecktoken(headers);
        // si no ha vencido entonces se le permite ver el formulario
        if (response.status === 200) {
          this.mostrarActualizar = true;
        }
      } catch (e) {
        this.mostrarActualizar = false;
        // si ha vencido entonces que intente de nuevo
        this.temporalAlert({
          message: 'El token de autorización ya venció',
          show: true,
          type: 'error',
        });
      }
    },

    async changePassword() {
      if (!this.validInput(this.new_pass)) return;
      if (!this.validInput(this.repeat_pass)) return;
      if (this.repeat_pass.value === this.new_pass.value) {
        // si paso las validaciones pasamos a hacer la peticion
        const data = {
          email: this.email,
          password: this.new_pass.value.toString(),
          confirmPassword: this.repeat_pass.value.toString(),
        };
        const response = await this.services.auth.recoveryPasswordChangePassword(data);
        // recordar hacer tostring a las password
        if (response.status === 200) {
          this.temporalAlert({
            show: true,
            message: 'Contraseña actualizada con éxito',
            type: 'success',
          });
          this.$router.push('/login');
          // si funcionó todo, entonces redirige al login y muestra mensaje
        }
      } else {
        this.error = true;
        this.temporalAlert({
          show: true,
          message: 'Las contraseñas no coinciden',
          type: 'warning',
        });
      }
    },
  },
  computed: {
    passwordRules() {
      return [
        (v) => (v !== null && v !== '') || 'Este campo es requerido',
        (v) => this.isPassword(v)
          || 'La contraseña debe tener al menos 1 minuscula, 1 mayuscula, 1 caracter especial, 1 numero y minimo 8 caracteres',
      ];
    },
  },
  created() {
    this.email = this.$route.query.mail;
    const token = localStorage.getItem('token');
    if (!this.email || token !== null) {
      this.$router.push('/');
    }
  },
};
</script>
<style lang="scss" scoped></style>
