<template>
  <div class="wrapper">
    <parallax class="page-header2 header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <div class="brand">
              <h1 >RED SOCIAL - UNIZAR</h1>
              <h3>Desarrollado para la asignatura de Arquitectura Software.</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <div class="title">
            <h2>TEMAS DISPONIBLES</h2>
            
          </div>
          <div >
              <md-button slot="footer" class="md-info md-round" type="submit" v-on:click="crearTema()"> <i class="material-icons">add_circle</i> Crear tema</md-button>
              <form>
                <md-field>
                    <md-icon>search</md-icon> 
                        <label>Titulo del tema</label>
                    <md-input v-model="search" type="text"></md-input>
                    
                </md-field>
            </form>
            
          </div>
          <md-table>
                  <md-table-row>
                    <md-table-cell> <b>Titulo</b></md-table-cell>
                    <md-table-cell> <b>Etiqueta</b></md-table-cell>
                    <md-table-cell> <b>Descripcion</b></md-table-cell>
                    <md-table-cell> <b>Creador</b></md-table-cell>
                  </md-table-row>
                  <md-table-row slot="md-table-row" v-for="tema of listafiltrada" :key="tema.id">
 
                      <md-table-cell md-label="Titulo" ><router-link class="routerlink" :to="{path:`/tema?id=${tema.id}`}">
                   
                   
                        {{ tema.titulo }}
                     
                      </router-link>
                      </md-table-cell>

                        <md-table-cell md-label="Etiqueta">
                        
                        {{ tema.etiqueta }}
                        
                     
                      </md-table-cell>

                      <md-table-cell md-label="Descripcion">
                        
                       
                        {{ tema.descripcion }}
                       
                     
                      </md-table-cell>

                      <md-table-cell md-label="Creador">
                    
                        {{ tema.creador }}
                       
                     
                      </md-table-cell>

                    
                      
                      
                  </md-table-row>
                </md-table>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {
  },
  data () {
    return {
      listafiltrada: [],
      listatemas: [],
      search: null
    }
  },

  name: "principal",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/Fondo_Ada_Byron.jpg")
    }
  },
  watch: {
    search: function (val) {
      if (this.listatemas != null) {
        this.listafiltrada = this.listatemas.filter(function (tema) {
          return tema['titulo'].toLowerCase().includes(val.toLowerCase()) || tema['etiqueta'].toLowerCase().includes(val.toLowerCase())
        })
      }
    }
  },
  beforeMount(){
    let url = 'http://localhost:3000/api/usuario/listaTemas'
    this.$http.get(url)
      .then(response => {
        if (response.status === 200) {
          let datos = response.data
          console.log(datos)
          for (var i = 0; i < datos.length; i++) {
            this.listafiltrada.push({ id: datos[i].id_tema, creador: datos[i].creador, 
            titulo: datos[i].titulo, descripcion: datos[i].descripcion, etiqueta: datos[i].etiqueta, fecha: datos[i].fecha });
            this.listatemas.push({ id: datos[i].id_tema, creador: datos[i].creador, 
            titulo: datos[i].titulo, descripcion: datos[i].descripcion, etiqueta: datos[i].etiqueta, fecha: datos[i].fecha });
          }
        }
        else{
            this.listafiltrada = null;
            this.listatemas = null;
        }
      })
},
  methods: {
    crearTema () {
      this.$router.push({ path: `/creartema` })
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    }
  }
};
</script>