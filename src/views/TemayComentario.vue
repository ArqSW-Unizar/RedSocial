<template>
  <div class="wrapper">
    <md-dialog-alert
      :md-active.sync="errores.exist"
      :md-title="errores.title"
      :md-content="errores.msg"
    />

    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper"></div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <div class="title">
            <h2>{{titulo}}</h2>
            <p class="description">Descripción: {{descripcion}}</p>
            <p class="description">Creador: {{creador}}</p>
          </div>

          <md-table>
            <md-table-row>
              <md-table-cell>
                <b>Autor</b>
              </md-table-cell>
              <md-table-cell>
                <b>Contenido</b>
              </md-table-cell>
              <md-table-cell style="width:200px;">
                <b>Fecha</b>
              </md-table-cell>
              <md-table-cell style="width:100px;">
                <b>Opciones</b>
              </md-table-cell>
            </md-table-row>
            <md-table-row
              slot="md-table-row"
              v-for="comentario of listaComentarios"
              :key="comentario.id_comentario"
            >
              <md-table-cell md-label="usuario1">{{ comentario.usuario }}</md-table-cell>

              <md-table-cell md-label="contenido1">{{ comentario.contenido }}</md-table-cell>

              <md-table-cell md-label="fecha4" style="width:200px;">{{ comentario.fecha }}</md-table-cell>

              <md-table-cell md-label="boton" style="width:200px;">
                <md-button
                  v-if="esDueño(comentario.usuario)"
                  class="md-danger md-sm"
                  type="submit"
                  @click="borrarComentario(comentario.id_comentario)"
                >Eliminar</md-button>
                <md-button
                  v-if="!esDueño(comentario.usuario)"
                  class="md-warning md-sm"
                  type="submit"
                >Denunciar</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <br />
          <br />
          <md-field>
            <label>Escribir un comentario.</label>
            <md-textarea v-model="contenido"></md-textarea>
          </md-field>

          <div>
            <md-button
              slot="footer"
              class="md-info md-round"
              type="submit"
              @click="añadirComentario()"
            >
              <i class="material-icons">add_circle</i> Añadir
            </md-button>
            <md-button
              
              slot="footer"
              class="md-info md-round"
              type="submit"
              @click="share()"
            >
              <i class="material-icons">share</i>Compartir
            </md-button>
            <md-button
              v-if="esCreador"
              slot="footer"
              class="md-danger md-round"
              type="submit"
              @click="borrarTema()"
            >Eliminar tema</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      listafiltrada: [],
      listaComentarios: [],
      search: null,
      esCreador: false,
      id_tema: "",
      creador: "",
      titulo: "",
      descripcion: "",
      etiqueta: "",
      fecha: "",
      contenido: "",
      errores: {
        exist: false,
        title: "",
        msg: ""
      }
    };
  },

  name: "temaycomentarios",
  bodyClass: "temaycomentarios",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/Fondo_Ada_Byron.jpg")
    }
  },
  beforeMount() {
    //var idtema = this.$route.query.id
    this.info();
    var idtema = this.$route.query.id;
    let url =
      "http://localhost:3000/api/usuario/listaComentarios/" + idtema + "";
    this.$http.get(url).then(response => {
      if (response.status === 200) {
        let datos = response.data;
        console.log(datos);
        for (var i = 0; i < datos.length; i++) {
          this.listaComentarios.push({
            id_comentario: datos[i].id_comentario,
            usuario: datos[i].usuario,
            contenido: datos[i].contenido,
            fecha: datos[i].fecha
          });
        }
      } else if (response.status === 201) {
        this.errores.title = "Atención";
        this.errores.msg =
          "Todavía no existe ningún comentario, se el primero.";
        this.errores.exist = true;
      }
    });
  },
  methods: {
    info() {
      console.log("Veamos que tema busca = " + this.$route.query.id);
      let url =
        "http://localhost:3000/api/usuario/info2/" + this.$route.query.id + "";
      this.$http.post(url).then(response => {
        if (response.status === 200) {
          this.id_tema = response.data["id_tema"];
          this.creador = response.data["creador"];
          this.titulo = response.data["titulo"].toUpperCase();
          this.descripcion = response.data["descripcion"];
          this.etiqueta = response.data["etiqueta"];
          this.fecha = response.data["fecha"];
          if (this.creador === this.$session.get("idusuario") || this.$session.get("tipo") === "admin") {
            this.esCreador = true;
          }
        }
      });
    },

    añadirComentario() {
      if (this.$session.get("idusuario") !== undefined) {
        let url = "http://localhost:3000/api/usuario/comentario";
        this.$http
          .post(url, {
            id_tema: this.$route.query.id,
            usuario: this.$session.get("idusuario"),
            contenido: this.contenido
          })
          .then(response => {
            //this.$router.push({ path: `tema/tema?id=${id_tema}` })
            console.log("Entra aqui?");
            location.reload();
          });
      } else {
        this.errores.title = "ERROR";
        this.errores.msg =
          "Está intentando añadir un comentario sin iniciar sesión.";
        this.errores.exist = true;
      }
    },
    borrarTema() {
      let url = "http://localhost:3000/api/usuario/borrarTema/";
      this.$http
        .post(url, {
          id_tema: this.$route.query.id
        })
        .then(response => {
          if (response.status === 200) {
            this.$router.push("/");
            location.reload();
          }
        });
    },
    borrarComentario(idComentario) {
      let url = "http://localhost:3000/api/usuario/borrarComentario/";
      this.$http
        .post(url, {
          id_comentario: idComentario
        })
        .then(response => {
          if (response.status === 200) {
            location.reload();
          }
        });
    },
    esDueño(autor) {
      return (autor === this.$session.get("idusuario") || this.$session.get("tipo") === "admin");
    },
    share(){
      this.errores.title = "Comparte este mensaje";
        this.errores.msg =
          "¡Tienes que ver lo último sobre el tema '"+ this.titulo +"' en la Red Social de Unizar. Lo puedes hacer en: " + window.location;
        this.errores.exist = true;
    }
  },

  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    }
  }
};
</script>