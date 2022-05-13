<template>
  <h2 class="text-center">Shipper</h2>
  <Loading :loading="loading"/>

  <Shipper :shipper="shipper" :key="shipper?.id"/>

  <h2 class="text-center mt-3">Shipper Contacts</h2>
  <div id="shipper-contacts">
    <div class="row" v-if="formErrors.length>0">
      <ul class="form-errors-list">
        <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <div class="row">
      <div class="col">
        <div class="row">
          <form @submit.prevent>
            <div class="mb-3">
              <label for="contact-name" class="form-label">Contact Name</label>
              <input type="text" class="form-control" id="contact-name" v-model="contactName">
            </div>
            <div class="mb-3">
              <label for="contact-number" class="form-label">Contact Number</label>
              <input type="text" class="form-control" id="contact-number" v-model="contactNumber">
            </div>

            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="is-primary-cb" v-model="isPrimary">
              <label class="form-check-label" for="is-primary-cb">
                Is primary?
              </label>
            </div>

            <button type="button" class="btn btn-primary mt-3" @click="addContact" :disabled="contactAddLoading">
              Add Contact
            </button>
          </form>
        </div>

        <div class="row">
          <table class="table mt-5">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Primary</th>
              <th scope="col">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="contacts.length===0">
              <td colspan="5">No contacts</td>
            </tr>
            <tr v-for="(contact, index) in contacts" :key="index" :class="{'primary-contact':contact.is_primary}">
              <th scope="row">{{ contact.id }}</th>
              <td>{{ contact.name }}</td>
              <td>{{ contact.contact_number }}</td>
              <td>{{ contact.is_primary ? 'Yes' : 'No' }}</td>
              <td>
                <button class="btn btn-sm btn-danger"
                        @click="deleteContact(contact.id)"
                        :disabled="shouldDisableActionButtons">
                  Delete
                </button>
                <button class="btn btn-sm btn-primary ms-1" @click="pickAsPrimary(contact.id)"
                        v-if="!contact.is_primary" :disabled="shouldDisableActionButtons">
                  Pick as Primary
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/shipperContacts.scss';
import Shipper from '@/components/Shipper';
import Loading from "@/components/Loading";
import {handleHttpError} from "@/helpers";

export default {
  name: "ShipperContacts",
  components: {
    Loading,
    Shipper,
  },
  data() {
    return {
      loading: false,
      contactAddLoading: false,
      contactDeleteLoading: false,
      pickingContactPrimaryLoading: false,
      shipperId: null,
      shipper: null,
      formErrors: [],
      contactName: '',
      contactNumber: '',
      isPrimary: false,
      contacts: [],
    };
  },
  computed: {
    shouldDisableActionButtons() {
      return this.contactDeleteLoading || this.pickingContactPrimaryLoading;
    }
  },
  methods: {
    addContact() {
      this.formErrors = [];
      this.validateContactForm();

      if (this.formErrors.length === 0) {
        this.contactAddLoading = true;

        const data = {
          name: this.contactName,
          contact_number: this.contactNumber,
          is_primary: this.isPrimary,
        };

        this.$api.addContact(this.shipperId, data)
            .then(() => {
              this.getShipper();

              // reset form
              this.contactName = '';
              this.contactNumber = '';
              this.isPrimary = false;
            })
            .catch(error => {
              console.log(error);
              this.formErrors = handleHttpError(error);
            })
            .finally(() => this.contactAddLoading = false);
      }
    },
    deleteContact(contactId) {
      this.contactDeleteLoading = true;

      this.$api.deleteContact(this.shipperId, contactId)
          .then(() => {
            this.getShipper();

            // reset form
            this.contactName = '';
            this.contactNumber = '';
            this.isPrimary = false;
          })
          .catch(error => {
            console.log(error);
            this.formErrors = handleHttpError(error);
          })
          .finally(() => this.contactDeleteLoading = false);
    },
    pickAsPrimary(contactId) {
      this.pickingContactPrimaryLoading = true;

      this.$api.pickContactAsPrimary(this.shipperId, contactId)
          .then(() => {
            this.getShipper();
          })
          .catch(error => {
            console.log(error);
            this.formErrors = handleHttpError(error);
          })
          .finally(() => this.pickingContactPrimaryLoading = false);
    },
    validateShipperForm() {
      if (this.companyName.trim().length === 0) {
        this.formErrors.push('Company Name is required!');
      }

      if (this.address.trim().length === 0) {
        this.formErrors.push('Address is required!');
      }
    },
    validateContactForm() {
      if (this.contactName.trim().length === 0) {
        this.formErrors.push('Contact Name is required!');
      }

      if (this.contactNumber.trim().length === 0) {
        this.formErrors.push('Contact Number is required!');
      }
    },
    getShipper() {
      this.loading = true;

      this.$api.getShipper(this.shipperId)
          .then(res => {
            this.shipper = res.data.data;
            this.contacts = this.shipper.contacts;
          })
          .catch(error => {
            console.log(error);
            this.$router.replace({path: '/'})
          })
          .finally(() => this.loading = false);

    },
  },
  mounted() {
    this.shipperId = this.$route.params.shipperId;
    this.getShipper();
  }
};
</script>