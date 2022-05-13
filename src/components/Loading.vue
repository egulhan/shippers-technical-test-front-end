<template>
  <div v-show="loading" class="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
import "@/assets/scss/loading.scss";

export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  }
}
</script>