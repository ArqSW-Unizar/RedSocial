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
            class="md-layout-item  mx-auto"
          >
            <login-card header-color="info">
                
              <h4 slot="title" class="card-title">Crear Tema</h4>
              
              
          <p slot="description" class="description">Rellene todos los campos</p>
                 <div class="md-layout-item md-size-50 md-xsmall-size-100 md-small-size-50 md-medium-size-25" slot="inputs">
                 <md-field class="md-form-group" slot="inputs">
                <md-icon>account_box</md-icon>
                <label>Titulo</label>
                <md-input v-model="titulo">"</md-input>
              </md-field>
                 </div>
              <div class="md-layout-item md-size-50 md-xsmall-size-100 md-small-size-50 md-medium-size-25" slot="inputs">
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Etiqueta</label>
                <md-input v-model="etiqueta"></md-input>
              </md-field>
              </div>
              <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-25" slot="inputs">
              <md-field class="md-form-group " slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Descripcion</label>
                <md-input v-model="description" ></md-input>
              </md-field>
              </div>
               
              
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
      responsive: false,
      titulo: null,
      etiqueta: null,
      description: null,
      creador: null,
      errores: {
        exist: false,
        title: '',
        msg: ''
      }
    };
  },
  methods: {
    handleSubmit () {
      
        if(this.$session.get('idusuario') !== undefined){
          let url = 'http://localhost:3000/api/usuario/tema'
        this.$http.post(url, {
          titulo: this.titulo,
          etiqueta: this.etiqueta,
          description: this.description,
          creador: this.$session.get('idusuario')
        })
          .then(response => {
            this.$router.push('/')
          })
        }
        else{
            this.errores.title = 'Error'
            this.errores.msg = 'Está intentando crear un tema sin iniciar sesión.'
            this.errores.exist = true
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