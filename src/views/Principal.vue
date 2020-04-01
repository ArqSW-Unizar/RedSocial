<template>
  <div class="wrapper">
    <parallax class="page-header2 header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <div class="title">
            <h2>Basic Elements</h2>
          </div>

<div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div><div class="title">
            <h2>Basic Elements</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {
  },

  name: "principal",
  bodyClass: "principal-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/Fondo_Ada_Byron.jpg")
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