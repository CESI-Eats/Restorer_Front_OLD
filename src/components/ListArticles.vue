<template>
        <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
    <div>
      <h1 style="text-align:center;">Articles</h1>
      <v-card v-for="article in articles" :key="article._id" class="mb-5">
        <v-card-title>{{ article.name }}</v-card-title>
        <v-card-text>{{ article.description }}</v-card-text>
        <v-img
            :src="article.image"
            height="200px"
            cover
            ></v-img>
        <v-card-subtitle>{{ article.price }} $</v-card-subtitle>
        <v-card-subtitle>{{ article._id }}</v-card-subtitle>
            <v-col cols="8" sm="8" md="6">
                <v-dialog
                    transition="dialog-bottom-transition"
                >
                    <template v-slot:activator="{ props }">
                    <v-btn
                        color="primary"
                        v-bind="props"
                    >Modifier un article</v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                    <v-card>
                        <v-toolbar
                        color="primary"
                        title="Modifier un article"
                        ></v-toolbar>
                        <v-card-text>
                        <div class="text-h2 pa-12"> 
                            <v-form @submit.prevent="updateArticle">
                                <v-text-field v-model="form.name" label="Name" required></v-text-field>
                                <v-text-field v-model="form.description" label="Description" required></v-text-field>
                                <v-text-field v-model="form.image" label="Image" required></v-text-field>
                                <v-text-field v-model="form.price" label="Price" required></v-text-field>
                            </v-form>
                        </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                        <v-btn type="submit" color="primary" @click="updateArticle(article._id)">Update</v-btn>
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
            <v-btn color="secondary" @click="deleteArticle(article._id)">Supprimer</v-btn>
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
        articles: [],
        form: 
            {

            }
      };
    },
    async created() {
       this.getMyCatalog();
    },
    methods: {
        
        editItem(article) {
            this.editedItem = Object.assign({}, article);
            this.editDialog = true;
            console.log(this.editDialog); // Ajouter cette ligne pour vérifier si la boîte de dialogue est activée
        },
        getMyCatalog(){
            bffAxios.get('/mycatalog')
        .then(response => {
              this.catalog = response.data
              this.articles = response.data.articles
              store.commit('showSnackbarinfo', {
                message: 'Catalog got',
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
        updateArticle(id) {
        store.commit('showSnackbarinfo', {
          message: 'Updating article...',
          color: 'info',
        });

        bffAxios.put(`/${this.catalog._id}/articles/${id}`, this.form)
        .then(() => {
              store.commit('showSnackbarinfo', {
                message: 'Article updated',
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
      async deleteArticle(articleId) {
        try {
          const responses = await bffAxios.get('/mycatalog');
          await bffAxios.delete(`/${responses.data._id}/articles/${articleId}`);
          this.articles = this.articles.filter(article => article._id !== articleId);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>