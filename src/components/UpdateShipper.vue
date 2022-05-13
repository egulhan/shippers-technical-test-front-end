<template>
  <div class="container" id="shipper-addition-page">
    <h2 class="text-center">Update Shipper</h2>

    <div class="row" v-if="formErrors.length>0">
      <ul class="form-errors-list">
        <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <div class="row">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="company-name" class="form-label">Company Name</label>
          <input type="text" class="form-control" id="company-name" v-model="companyName">
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" v-model="address">
        </div>
      </form>
    </div>

    <div class="row mt-4">
      <button type="submit" class="btn btn-primary btn-lg" @click="submitForm">Update Shipper</button>
    </div>
  </div>
</template>

<script>
import {handleHttpError} from "@/helpers";

export default {
  name: "UpdateShipper",
  data() {
    return {
      shipperId: null,
      shipper: null,
      formErrors: [],
      companyName: '',
      address: '',
    };
  },
  methods: {
    async submitForm() {
      this.formErrors = [];
      this.validateShipperForm();

      if (this.formErrors.length === 0) {
        const data = {
          company_name: this.companyName,
          address: this.address,
        };

        this.$api.updateShipper(this.shipperId, data)
            .then(() => {
              this.$router.push({path: '/'});
            })
            .catch(error => {
              console.log(error);
              this.formErrors = handleHttpError(error);
            });
      }
    },
    validateShipperForm() {
      if (this.companyName.trim().length === 0) {
        this.formErrors.push('Company Name is required!');
      }

      if (this.address.trim().length === 0) {
        this.formErrors.push('Address is required!');
      }
    },
    async getShipper() {
      this.$api.getShipper(this.shipperId)
          .then(res => {
            const shipper = res.data.data;
            this.companyName = shipper.company_name;
            this.address = shipper.address;
          })
          .catch(error => {
            console.log(error);
            this.$router.replace({path: '/'})
          });
    },
  },
  mounted() {
    this.shipperId = this.$route.params.shipperId;
    this.getShipper();
  },
}
</script>