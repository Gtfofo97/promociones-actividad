<template>
  <v-app>
    <v-main class="bgMinsal">
      <v-container fluid class="mb-5 mb-sm-16">
        <v-layout justify-center>
          <v-flex xs12 sm8 md6 lg4>
            <v-img
              class="mx-auto d-flex mb-2"
              src="@/assets/img/SIS-HAZUL.png"
              max-width="350"
            />
            <v-card v-if="!selectedMethod" class="pa-6" rounded="lg">
              <v-card-title primary-title>Tipo de autenticación</v-card-title>
              <v-card-text class="pb-0"
                >Se le proporcionará un <b>código temporal</b> para iniciar
                sesión. Seleccione:</v-card-text
              >

              <v-list rounded flat>
                <v-list-item
                  @click="checkSelectedMethod(item.id)"
                  v-for="(item, index) in metodos_auth"
                  :key="index"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icono }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card
              class="pa-2 pa-sm-6"
              v-if="selectedMethod == 1"
              rounded="lg"
            >
              <v-card-title primary-title> Correo electrónico </v-card-title>
              <v-card-text
                >Se envió un código de seis digitos a su
                <b>correo electrónico</b>, por favor ingrese el
                código</v-card-text
              >
              <v-card-text class="py-2">
                <v-text-field
                  placeholder="ingrese el codigo"
                  label="Codigo"
                  v-model="codigo"
                  pattern="[0-9]*"
                  type="number"
                  @keypress="this.restrictInteger"
                  color="blueMinsal"
                  v-mask="'######'"
                  @keypress.enter="check2fa()"
                  :rules="[
                    (v) =>
                      (v !== null && v !== '') || 'Este campo es obligatorio',
                    (v) => (v !== null && v.length === 6) || 'Código inválido',
                  ]"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="py-0">
                <v-row class="my-2 my-xs-0">
                  <v-btn
                    color="blueMinsal white--text elevation-0 ma-1"
                    rounded
                    @click="check2fa()"
                  >
                    Ingresar
                  </v-btn>
                  <v-btn
                    class="d-xs-flex ma-1"
                    color="blueMinsal elevation-0 "
                    rounded
                    text
                    v-if="metodos_auth.length !== 1"
                    @click="
                      selectedMethod = null;
                      codigo = null;
                    "
                  >
                    Probar otro método
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
            <v-card
              class="pa-2 pa-sm-6"
              v-if="selectedMethod == 2"
              rounded="lg"
            >
              <v-card-title primary-title>
                Autenticación de código QR
              </v-card-title>
              <v-card-text
                >Ingrese el código que le proporciona la aplicación de
                <b>Autenticador de Google</b> o
                <b>Autenticador de Microsoft</b></v-card-text
              >
              <v-card-text class="py-2">
                <v-text-field
                  placeholder="ingrese el codigo"
                  label="Codigo"
                  v-model="codigo"
                  pattern="[0-9]*"
                  type="number"
                  @keypress="this.restrictInteger"
                  @keypress.enter="check2fa()"
                  :rules="[
                    (v) =>
                      (v !== null && v !== '') || 'Este campo es obligatorio',
                    (v) => (v !== null && v.length === 6) || 'Código inválido',
                  ]"
                  color="blueMinsal"
                  v-mask="'######'"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="py-0">
                <v-row class="my-2 my-xs-0">
                  <v-btn
                    color="blueMinsal white--text elevation-0 ma-1"
                    rounded
                    @click="check2fa()"
                  >
                    Ingresar
                  </v-btn>
                  <v-btn
                    class="d-xs-flex ma-1"
                    color="blueMinsal  elevation-0 "
                    rounded
                    text
                    @click="
                      selectedMethod = null;
                      codigo = null;
                    "
                    v-if="metodos_auth.length !== 1"
                  >
                    Probar otro método
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer class="text-center blueDarkMinsal pa-3 absolute">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-img
            src="@/assets/img/escudo-white-minsal.png"
            width="200"
            class="mx-auto"
          />
        </v-col>
        <v-col
          class="text-center white--text font-weight-thin align-center"
          cols="12"
          sm="6"
          md="4"
        >
          <p class="ma-0">
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
/* eslint-disable no-unused-expressions */
import jwtDecode from 'jwt-decode';
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    codigo: null,
    tempToken: null,
    check2fa_resp: null,
    selectedMethod: null,
    metodos_auth: null,
  }),
  methods: {
    ...mapMutations(['setToken', 'setUserInfo']),
    async checkSelectedMethod(id) {
      this.selectedMethod = id;
      if (this.selectedMethod === 1) {
        const data = { id_metodo: this.selectedMethod };
        const headers = {
          Authorization: `Bearer ${this.tempToken}`,
        };
        const response = await this.services.auth.twoFa(data, headers);
        if (response?.status === 200) {
          this.temporalAlert({
            show: true,
            message: 'Revise su bandeja de entrada',
            type: 'success',
          });
        }
      }
    },
    async check2fa() {
      if (!this.codigo) {
        this.temporalAlert({
          show: true,
          message: 'Por favor ingrese su código',
          type: 'error',
        });
        return;
      }
      try {
        const data = { codigo: this.codigo, id_metodo: this.selectedMethod };
        const headers = {
          Authorization: `Bearer ${this.tempToken}`,
        };
        const response = await this.services.auth.twoFaCheck(data, headers);
        if (response?.status === 200) {
          this.check2fa_resp = response.data;
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refresh_token', response.data.refreshToken);
          this.setToken(response.data.token);
          this.setUserInfo(jwtDecode(response.data.token));
        }
      } catch (e) {
        e.response
          ? this.temporalAlert({
            show: true,
            message: e.response.data.message,
            type: 'error',
          })
          : null;
      } finally {
        // eslint-disable-next-line no-nested-ternary
        this.check2fa_resp
          ? this.check2fa_resp['2fa'] === true
            ? this.$router.push('/')
            : null
          : null;
      }
    },
  },
  mounted() {
    this.tempToken = this.$route.params.token;
    this.metodos_auth = this.$route.params.metodos_autenticacion;
    if (!this.metodos_auth || !this.tempToken) {
      this.$router.push('/login');
    }
    this.metodos_auth.forEach((element) => {
      if (element.is_primary) {
        this.checkSelectedMethod(element.id);
      }
    });
  },
};
</script>
