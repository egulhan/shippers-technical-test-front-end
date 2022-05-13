<template>
  <div class="card shipper-container">
    <div class="card-body">
      <h5 class="card-title">{{ shipper?.company_name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ shipper?.address }}</h6>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shipper",
  props: {
    shipper: {
      type: Object,
      required: true,
    },
  },
}
</script>