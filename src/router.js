import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import Registro from "./views/Registro.vue";
import Tema from "./views/Tema.vue";
import Perfil from "./views/Perfil.vue";

import Temaycomentario from "./views/TemayComentario.vue";
import Principal from "./views/Principal.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/registro",
      name: "registro",
      components: { default: Registro, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/crearTema",
      name: "crearTema",
      components: { default: Tema, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/",
      name: "principal",
      components: { default: Principal, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/tema",
      name: "tema",
      components: { default: Temaycomentario, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/perfil",
      name: "perfil",
      components: { default: Perfil, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 5 },
        footer: { backgroundColor: "black" }
      }
    },
      {
      path: "*",
      name: "principal2",
      components: { default: Principal, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 200 },
        footer: { backgroundColor: "black" }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
