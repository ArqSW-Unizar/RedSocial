<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="info">
                
              <h4 slot="title" class="card-title">Login</h4>
              <img slot="description"
            :src="RSUnizar"
            class="img-raised rounded"
            :class="{ 'responsive-image': responsive }"
          />
                 <md-field class="md-form-group" slot="inputs">
                <md-icon>account_box</md-icon>
                <label>Username</label>
                <md-input v-model="firstname"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-info md-round">Aceptar</md-button>
              <md-button slot="footer" class="md-simple md-info md-lg">
                ¿No tienes cuenta?<br>Regístrate aquí
              </md-button>
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
  bodyClass: "login-page",
  data() {
    return {
      RSUnizar: require("@/assets/img/logoRSUnizar.png"),
      firstname: null,
      email: null,
      password: null
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/Fondo_CPS.png")
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
