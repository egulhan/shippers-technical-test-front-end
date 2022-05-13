<template>
  <div class="container-fluid">
    <Menu/>

    <div class="container mt-3">
      <div class="row  justify-content-md-center">
        <div class="col-8">
          <RouterView/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/scss/app.scss";
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: {
    Menu,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>