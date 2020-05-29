<template>

  <div class="wrapper">
    <md-dialog-alert
      :md-active.sync="errores.exist"
      :md-title= "errores.title"
      :md-content= "errores.msg" />
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
          <template v-if="!authenticated">
            <login-card header-color="info">
                
              <h4 slot="title" class="card-title">Login</h4>
              <img slot="description"
            :src="RSUnizar"
            class="img-raised rounded"
            :class="{ 'responsive-image': responsive }"
          />
                 <md-field class="md-form-group" slot="inputs">
                <md-icon>account_box</md-icon>
                <label>Nick</label>
                <md-input v-model="nick"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password" type="PassWord"></md-input>
              </md-field>
              <md-button slot="footer" class="md-info md-round" type="submit" @click="handleSubmit">Aceptar</md-button>
              
              <md-button slot="footer" class="md-simple md-info md-lg" type="submit" @click="registrarte">
                ¿No tienes cuenta?<br>Regístrate aquí
              </md-button>
            </login-card>
             </template>

            <template v-if="authenticated">
          <md-card>
            <md-card-header>
              <h4 class="card-title" style="text-align: center;">Logout</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <h3>Si ha terminado la actividad por favor cierre sesión</h3>
                <div class="md-layout-item md-size-100 text-left">
                  <md-button class="md-danger" type="submit" @click="handleLogout">Logout</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </template>
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
  created () {
    this.authenticated = this.$session.exists()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      let url = 'http://localhost:3000/api/usuario/login'
      this.$http.post(url, {
        nick: this.nick,
        password: this.sha512(this.password).toString()
      })
        .then(response => {
          if (response.status === 200) {
            this.$session.start()
            this.$session.set('idusuario', response.data['nick'])
            this.$session.set('tipo', response.data['tipo'])
            this.$emit('logueado',true)
            this.$router.push('/')
            location.reload()
           
            
          }else{
            this.errores.title = 'Error'
            this.errores.msg = 'Usuario y/o contraseña incorrectos. Vuelva a intentarlo'
            this.errores.exist = true
          }
        })
    },
    handleLogout (e) {
      e.preventDefault()
      
      this.$session.destroy()
      this.authenticated = false
      //location.reload()
      
      this.$router.push('/')
      this.actualizar(false)
      location.reload()
    },
    
    actualizar(b) {
      this.$emit('logueado',b)
    },
    registrarte () {
      this.$router.push({ path: `/registro` })
    }
 },
  bodyClass: "login-page",
  data() {
    return {
      RSUnizar: require("@/assets/img/logoRSUnizar.png"),
      sha512: require('crypto-js/sha512'),
      nick: null,
      password: null,
      responsive: false,
      errores: {
        exist: false,
        title: '',
        msg: ''
      }
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
