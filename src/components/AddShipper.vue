<template>
  <div class="container" id="shipper-addition-page">
    <h2 class="text-center">Add Shipper</h2>

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

      <div class="row mt-4">
        <button type="submit" class="btn btn-primary btn-lg" @click="submitForm" :disabled="loading">Add Shipper
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {handleHttpError} from "@/helpers";

export default {
  name: "AddShipper",
  data() {
    return {
      loading: false,
      formErrors: [],
      companyName: '',
      address: '',
    };
  },
  methods: {
    submitForm() {
      this.loading = true;
      this.formErrors = [];
      this.validateShipperForm();

      if (this.formErrors.length === 0) {
        const data = {
          company_name: this.companyName,
          address: this.address,
          contacts: this.contacts,
        };

        this.$api.addShipper(data)
            .then(() => {
              this.$router.push({path: '/'});
            })

            .catch(error => {
              console.log(error);
              this.formErrors = handleHttpError(error);
            })
            .finally(() => this.loading = false);
      } else {
        this.loading = false;
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
  },
}
</script>