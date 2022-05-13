<template>
  <h2 class="text-center">Shippers</h2>

  <Loading :loading="loading"/>

  <div v-if="!loading" id="shipper-list">
    <div class="alert alert-warning" role="alert" v-if="shippers.length===0">
      No shippers to show. Go
      <RouterLink class="alert-link" to="/shippers/add">here</RouterLink>
      to add a new shipper.
    </div>

    <Shipper v-for="shipper in shippers" :shipper="shipper" :key="shipper.id">
      <template v-slot:footer>
        <div class="row">
          <div class="col-4">Primary Contact Number</div>
          <div class="col">{{ shipper?.primary_contact?.contact_number || '-' }}</div>
        </div>
        <div class="row">
          <div class="col-4">Primary Contact Name</div>
          <div class="col">{{ shipper?.primary_contact?.name || '-' }}</div>
        </div>

        <div class="mt-3">
          <RouterLink :to="'/shippers/'+shipper.id+'/contacts'" class="btn btn-primary">Contacts</RouterLink>
          <RouterLink :to="'/shippers/'+shipper.id+'/update'" class="btn btn-primary ms-2">Update</RouterLink>
        </div>
      </template>
    </Shipper>
  </div>
</template>

<script>
import '@/assets/scss/shipperList.scss';
import Shipper from '@/components/Shipper';
import Loading from "@/components/Loading";
import {handleHttpError} from "@/helpers";

export default {
  name: "ShipperList",
  components: {
    Loading,
    Shipper,
  },
  data() {
    return {
      shippers: [],
      loading: false,
    };
  },
  methods: {},
  mounted() {
    this.loading = true;

    this.$api.getShippers()
        .then(res => {
          this.shippers = res.data.data;
        })
        .catch(error => {
          console.log(error);
          const errorMessages = handleHttpError(error);

          if (errorMessages?.length > 0) {
            alert(errorMessages[0]);
          }
        })
        .finally(() => this.loading = false);
  }
};
</script>