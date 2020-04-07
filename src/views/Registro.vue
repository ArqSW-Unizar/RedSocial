<template>
  <div class="wrapper">
    <div class="section page-header3 header-filter" :style="headerStyle">
      <div class="container">
        <br><br><br>
        <br><br>
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="info">
                
              <h4 slot="title" class="card-title">Registro</h4>
              
              <img slot="description"
            :src="RSUnizar"
            class="img-raised rounded"
            :class="{ 'responsive-image': responsive }"
          />
          <p slot="description" class="description">Rellene todos los campos</p>
                 <md-field class="md-form-group" slot="inputs">
                <md-icon>account_box</md-icon>
                <label>Username</label>
                <md-input v-model="username"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Repeat Password</label>
                <md-input type="password" v-model="passrepeat"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                  <md-icon></md-icon>
                <label>Name</label>
                <md-input v-model="name"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                  <md-icon></md-icon>
                <label>email</label>
                <md-input v-model="email"></md-input>
              </md-field>
              <md-button slot="footer" class="md-info md-round" type="submit" @click="handleSubmit()">Confirmar</md-button>
              
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
      sha512: require('crypto-js/sha512'),
      responsive: false,
      username: null,
      email: null,
      password: null,
      name: null,
      passrepeat: null
    };
  },
  methods: {
    handleSubmit () {
      console.log("Entra a registrar")
      if (this.password === this.passrepeat && this.password.length > 0) {
        let url = 'http://localhost:3000/api/usuario/register'
        this.$http.post(url, {
          username: this.username,
          name: this.name,
          email: this.email,
          password: this.sha512(this.password).toString()
        })
          .then(response => {
            this.$router.push('/login')
          })
      }
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
        backgroundImage: `url(${this.header})`,
      };
    }
  }
};
</script>

<style lang="css"></style>