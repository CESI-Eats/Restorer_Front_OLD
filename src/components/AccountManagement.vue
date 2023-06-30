<template>
    <v-container class="manage-account-container">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="manage-account-card">
            <v-card-title class="text-center">Manage Account</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="updateAccount">
                <v-text-field v-model="form.name" label="Name" required></v-text-field>
                <v-text-field v-model="form.phoneNumber" label="Phone Number" required></v-text-field>
                <v-text-field v-model="form.address.street" label="Street" required></v-text-field>
                <v-text-field v-model="form.address.postalCode" label="Postal Code" required></v-text-field>
                <v-text-field v-model="form.address.city" label="City" required></v-text-field>
                <v-text-field v-model="form.address.country" label="Country" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn type="submit" color="Secondary" @click="collectKitty()" :to="`/account`">Collect kitty ({{form.kitty}})</v-btn>
              <v-btn type="submit" color="primary" @click="updateAccount()" :to="`/account`">Update</v-btn>
              <v-btn type="submit" color="error" @click="deleteAccount()" :to="`/`">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import {bffAxios} from '@/services/axios';
  import {store} from "@/services/store";
  
  export default {
    data() {
      return {
        form: {
          name: '',
          phoneNumber: '',
          kitty: 0,
          address: {
            street: '',
            postalCode: '',
            city: '',
            country: '',
          },
        },
        mode: 'bank transfer'
      };
    },
    mounted() {
      this.fetchAccount();
      //this.fetchCatalog();
    },
    methods: {
      fetchAccount() {
        store.commit('showSnackbarinfo', {
          message: 'Recovering account...',
          color: 'info',
        });
        bffAxios.get('/myaccount')
            .then(response => {
              this.form = response.data;
              store.commit('showSnackbarinfo', {
                message: 'Account recovered',
                color: 'success',
              });
            })
            .catch(error => {
              console.error(error);
              store.commit('showSnackbarinfo', {
                message: 'Error while recovering account',
                color: 'error',
              });
            });
      },
      updateAccount() {
        store.commit('showSnackbarinfo', {
          message: 'Updating account...',
          color: 'info',
        });
        bffAxios.put('/myaccount', this.form)
            .then(() => {
              store.commit('showSnackbarinfo', {
                message: 'Account updated',
                color: 'success',
              });
            })
            .catch(() => {
              store.commit('showSnackbarinfo', {
                message: 'Update failed',
                color: 'error',
              });
            });
      },
      deleteAccount() {
        store.commit('showSnackbarinfo', {
          message: 'Deleting account...',
          color: 'info',
        });
        bffAxios.delete('/accounts')
            .then(() => {
              store.commit('showSnackbarinfo', {
                message: 'Account deleted',
                color: 'success',
              });
            })
            .catch(() => {
              store.commit('showSnackbarinfo', {
                message: 'delete failed',
                color: 'error',
              });
            });
      },
      collectKitty() {
        store.commit('showSnackbarinfo', {
          message: 'Collect kitty...',
          color: 'info',
        });
        bffAxios.post('/collectkitty', {mode: this.mode})
            .then(() => {
              store.commit('showSnackbarinfo', {
                message: 'Kitty collected',
                color: 'success',
              });
            })
            .catch(() => {
              store.commit('showSnackbarinfo', {
                message: 'Collect kitty failed',
                color: 'error',
              });
            });
      },
    },
  };
  </script>