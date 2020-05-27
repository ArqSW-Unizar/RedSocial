<template>
  <md-toolbar
    v-if="showDownload"
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">
          <b>|| Red Social Arquitectura Software ||</b>
        </h3>
        <h3 class="md-title">{{$route.name}}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <template v-if="authenticated">
                <li class="md-list-item">
                  <a
                    href="javascript:void(0)"
                    class="md-list-item-router md-list-item-container md-button-clean"
                  >
                    <div class="md-list-item-content">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple">
                        <i class="material-icons">portrait</i>
                        <p>
                          <a href="#/perfil">Mi perfil</a>
                        </p>
                      </md-button>
                    </div>
                  </a>
                </li>
                <li class="md-list-item">
                  <a
                    href="javascript:void(0)"
                    class="md-list-item-router md-list-item-container md-button-clean"
                  >
                    <div class="md-list-item-content">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple">
                        <i class="material-icons">people</i>
                        <p>usuarios</p>
                      </md-button>
                    </div>
                  </a>
                </li>
                </template>
                <li class="md-list-item">
                  <a
                    href="javascript:void(0)"
                    class="md-list-item-router md-list-item-container md-button-clean"
                  >
                    <div class="md-list-item-content">
                      <md-button slot="title" class="md-button md-button-link md-white md-simple">
                        <i class="material-icons">home</i>
                        <p>
                          <a href="#/">temas</a>
                        </p>
                      </md-button>
                    </div>
                  </a>
                </li>
              
              <li class="md-list-item" v-if="showDownload">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean"
                >
                  <div class="md-list-item-content">
                    
                  
                  <v-popover offset="4" placement="bottom">
                    <md-button class="md-button md-button-link md-white md-simple"><i class="material-icons">info</i>
                      <p>Sobre nosotros</p></md-button>

                    <template slot="popover">
                      <h3 class="popover-header">UNIZAR</h3>
                      <div
                        class="popover-body"
                      >Proyecto realizado por Fernando Bercedo, Óscar Baselga y José Manuel Vidarte.</div>
                    </template>
                  </v-popover>
                  </div>
                </a>
              </li>
              <li class="md-list-item" v-if="showDownload">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean"
                >
                  <div class="md-list-item-content">
                    <div class="md-list-item-content">
                      <md-button
                        class="md-info md-default"
                        type="submit"
                        v-on:click="loguearte()"
                      >{{tipo}}</md-button>
                    </div>
                  </div>
                </a>
              </li>

              <div class="md-collapse"></div>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      tipo: null
    };
  },
  created() {
    this.authenticated = this.$session.exists();
    this.act = false;
    if (this.$session.exists()) {
      this.autorizacion = this.$session.get("tipo");
      this.act = true;
    }
  },

  computed: {
    showDownload() {
      //Para que alguna clase no incluya la navbar
      const excludedRoutes = [""];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-t");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
    loguearte() {
      this.$router.push({ path: `/login` });
    }
  },
  beforeMount() {
    if (this.$session.exists()) {
      this.tipo = "Cerrar Sesión";
    } else {
      this.tipo = "Iniciar Sesión";
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
