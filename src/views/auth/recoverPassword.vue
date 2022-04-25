<template>
  <v-app>
    <v-main class="bgMinsal">
      <v-container fill-height justify-center fluid>
        <v-flex xs12 sm8 md6 lg4 xl3>
          <v-card class="rounded-lg px-2 px-sm-10 elevation-3">
            <v-card-title class="justify-center blueGrayMinsal--text"
              >Recuperar Contraseña</v-card-title
            >
            <v-card-text>
              <v-divider></v-divider>
              <div class="body-1 my-2">
                Complete este formulario con su dirección de correo electrónico.
                Si la dirección ingresada se encuentra en nuestros registros le
                enviaremos un correo con las instrucciones para reestablecer su
                contraseña.
              </div>
              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="text"
                color="blueMinsal"
                :error="email_error"
                :error-messages="email_message"
                v-model="email"
                :rules="userRules"
                v-if="success == false"
              ></v-text-field>
              <v-alert
                dense
                text
                type="success"
                :value="success == true"
                transition="slide-x-transition"
              >
                Solicitud realizada, por favor revise su bandeja de entrada de
                su
                <strong> correo electrónico</strong>
              </v-alert>
            </v-card-text>
            <v-card-actions class="justify-space-around pb-5" width="100%">
              <v-btn
                class="blueMinsal white--text"
                rounded
                :loading="loading"
                @click="sendEmail"
                v-if="!success"
                >Solicitar</v-btn
              >
              <v-divider vertical v-if="!success"></v-divider>
              <v-btn
                to="/login"
                class="blueMinsal--text"
                rounded
                text
                style="text-transform: none"
                >Iniciar sesión</v-btn
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
    email: null,
    loading: false,
    success: false,
    email_error: false,
    email_message: '',
  }),
  methods: {
    valid(v) {
      return this.isEmail(v);
    },
    async sendEmail() {
      if (this.valid(this.email)) {
        this.loading = true;
        this.email_error = false;
        this.email_message = '';
        // Se usa form data para enviar el email
        const formData = new FormData();
        formData.append('email', this.email);
        const response = await this.services.auth.recoveryPassword(this.email);
        // Si todo esta bien muestra alerta tipo success
        if (response.status === 200) {
          this.success = true;
        }
        this.loading = false;
      } else {
        this.email_error = true;
        this.email_message = 'Correo electrónico no valido';
      }
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
};
</script>
<style lang="scss" scoped></style>
