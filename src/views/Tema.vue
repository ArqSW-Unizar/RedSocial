<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="info">
                
              <h4 slot="title" class="card-title">Crear Tema</h4>
              
              <img slot="description"
            :src="RSUnizar"
            class="img-raised rounded"
            :class="{ 'responsive-image': responsive }"
          />
          <p slot="description" class="description">Rellene todos los campos</p>
                 <md-field class="md-form-group" slot="inputs">
                <md-icon>account_box</md-icon>
                <label>Titulo</label>
                <md-input v-model="titulo"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Etiqueta</label>
                <md-input v-model="etiqueta"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Descripcion</label>
                <md-input v-model="description"></md-input>
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
      titulo: null,
      etiqueta: null,
      description: null
    };
  },
  methods: {
    handleSubmit () {
      console.log("Entra a registrar")
      
        let url = 'http://localhost:3000/api/usuario/tema'
        this.$http.post(url, {
          titulo: this.titulo,
          etiqueta: this.etiqueta,
          description: this.description
        })
          .then(response => {
            this.$router.push('/')
          })
      
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