<template>
<v-row justify="center">
    <v-col cols="12" sm="8" md="6">
    <div>
        <h1 style="text-align: center;">Menus</h1>
        <br/>
      <v-card v-for="menu in menus" :key="menu._id" class="mb-5">
        <v-card-title>{{ menu.name }}</v-card-title>
        <v-card-text>{{ menu.description }}</v-card-text>
        <v-img
            :src="menu.image"
            height="200px"
            cover
            ></v-img>
        <v-card-subtitle>{{ menu.price }}</v-card-subtitle>
        <v-card-text>{{ menu.articles }}</v-card-text>


        <v-col cols="8" sm="8" md="6">
                <v-dialog
                    transition="dialog-bottom-transition"
                >
                    <template v-slot:activator="{ props }">
                    <v-btn
                        color="primary"
                        v-bind="props"
                    >Modifier un menu</v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                    <v-card>
                        <v-toolbar
                        color="primary"
                        title="Modifier un menu"
                        ></v-toolbar>
                        <v-card-text>
                        <div class="text-h2 pa-12"> 
                            <v-form @submit.prevent="updateMenu">
                                <v-text-field v-model="form.name" label="Name" required></v-text-field>
                                <v-text-field v-model="form.description" label="Description" required></v-text-field>
                                <v-text-field v-model="form.image" label="Image" required></v-text-field>
                                <v-text-field v-model="form.articles" label="Articles" required></v-text-field>
                            </v-form>
                        </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                        <v-btn type="submit" color="primary" @click="updateMenu(menu._id)">Update</v-btn>
                        <v-btn
                            variant="text"
                            @click="isActive.value = false"
                        >Annuler</v-btn>
                        </v-card-actions>
                    </v-card>
                    </template>
                </v-dialog>
                </v-col>


        <v-card-actions>
          <v-btn color="secondary" @click="deleteMenu(menu._id)">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    </v-col>
    </v-row>
</template>

<script>
import { bffAxios } from '@/services/axios';
import {store} from '@/services/store';

export default {
  data() {
    return {
        catalog: {},
      menus: [],
      form: 
            {

            }
    };
  },
  async created() {
      this.getMyCatalog();
  },
  methods: {
    editMenu(menu) {
      this.editedItem = Object.assign({}, menu);
      this.editDialog = true;
    },
    getMyCatalog(){
            bffAxios.get('/mycatalog')
        .then(response => {
              this.catalog = response.data
              this.menus = response.data.menus
              store.commit('showSnackbarinfo', {
                message: 'Menu got',
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
        updateMenu(id) {
        store.commit('showSnackbarinfo', {
          message: 'Updating article...',
          color: 'info',
        });

        bffAxios.put(`/${this.catalog._id}/menus/${id}`, this.form)
        .then(() => {
              store.commit('showSnackbarinfo', {
                message: 'Menu updated',
                color: 'success',
              });
              this.getMyCatalog();
            })
            .catch(() => {
              store.commit('showSnackbarinfo', {
                message: 'Update failed',
                color: 'error',
              });
            });
      },
    async deleteMenu(menuId) {
      try {
        const responses = await bffAxios.get('/mycatalog');
        await bffAxios.delete(`/${responses.data._id}/menus/${menuId}`);
        this.menus = this.menus.filter(menu => menu._id !== menuId);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
