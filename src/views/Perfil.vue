<template>
  <div class="wrapper">
    <md-dialog-confirm
      :md-active.sync="errores.exist"
      :md-title="errores.title"
      :md-content="errores.msg"
      md-confirm-text="Confirmar"
      md-cancel-text="Cancelar"
      @md-confirm="darbaja()"
    />
    <div class="section page-header3 header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item mx-auto">
            <login-card header-color="info">
              <h4 slot="title" class="card-title">Mi perfil</h4>

              <p
                slot="description"
                class="description"
              >Aquí puede editar la información de su perfil</p>
              <div
                class="md-layout-item md-size-50 md-xsmall-size-100 md-small-size-50 md-medium-size-25"
                slot="inputs"
              >
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>account_box</md-icon>
                  <label>Username</label>
                  <md-input v-model="username">"</md-input>
                </md-field>
              </div>
              <div
                class="md-layout-item md-size-50 md-xsmall-size-100 md-small-size-50 md-medium-size-25"
                slot="inputs"
              >
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>face</md-icon>
                  <label>Nombre completo</label>
                  <md-input v-model="nombre"></md-input>
                </md-field>
              </div>
              <div
                class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-25"
                slot="inputs"
              >
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label>Email</label>
                  <md-input v-model="email"></md-input>
                </md-field>
              </div>
              <md-button
                slot="footer"
                class="md-info md-raised"
                type="submit"
                @click="actualizar()"
              >Actualizar</md-button>
              <md-button
                slot="footer"
                class="md-danger md-raised"
                type="submit"
                @click="handleSubmit()"
              >Dar de baja</md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard
  },
  bodyClass: "registro-page",
  data() {
    return {
      RSUnizar: require("@/assets/img/logoRSUnizar.png"),
      responsive: false,
      username: null,
      email: null,
      nombre: null,
      errores: {
        exist: false,
        title: "",
        msg: ""
      }
    };
  },
  beforeMount() {
    this.info();
  },
  methods: {
    handleSubmit() {
      this.errores.title = "Atención";
      this.errores.msg = "¿Está seguro de que quiere dar de baja su cuenta?";
      this.errores.exist = true;
    },
    darbaja() {
      let url = 'http://localhost:3000/api/usuario/dardebaja/' + this.$session.get('idusuario') + ''
      this.$http.post(url)
        .then(response => {
          if (response.status === 200) {
            this.$session.destroy()
            this.$router.push('/')
            this.$emit('logueado',false)
            location.reload()
          }
        })
    },
    info() {
      let url =
        "http://localhost:3000/api/usuario/info/" + this.$session.get("idusuario") + "";
      this.$http.post(url).then(response => {
        if (response.status === 200) {
          this.username = response.data["nick"];
          this.nombre = response.data["nombre"];
          this.email = response.data["correo"];
        }
      });
    },
    actualizar() {
      let url =
        "http://localhost:3000/api/usuario/actualizarPerfil/" +
        this.$session.get("idusuario") +
        "";
      this.$http
        .post(url, {
          username: this.username,
          email: this.email,
          nombre: this.nombre
        })
        .then(response => {
          if (response.status === 200) {
            this.username = response.data["nick"];
            this.email = response.data["correo"];
            this.nombre = response.data["nombre"];
            this.$session.set('idusuario', response.data['nick'])

            this.$router.go("/perfil");
          }
        });
    }
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/Fachada_eina.jpeg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css"></style>