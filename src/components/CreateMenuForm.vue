<template>
    <v-card>
      <v-card-title class="animated-title" :class="{ 'green--text': isRotating }">Créer un nouveau menu</v-card-title>
      <v-card-text>
        <v-text-field v-model="form.name" label="Nom du menu"></v-text-field>
        <v-textarea v-model="form.description" label="Description du menu"></v-textarea>
        <v-text-field v-model="form.image" label="Image du menu"></v-text-field>
        <div v-for="(item, index) in form.articles" :key="index">
          <v-select
            :value="item"
            @input="value => updateItem(index, value)"
            :articles="articles"
            item-text="name"
            item-value="_id"
            label="Sélectionnez un article"
            return-object
          ></v-select>
          <v-btn color="error" @click="removeItem(index)">Supprimer l'article</v-btn>
        </div>
        <v-btn color="primary" @click="addItem">Ajouter un article</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="createMenu">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import {bffAxios} from '@/services/axios';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          description: '',
          image: '',
          articles: [{}]
        },
        articles: [{}],
        isRotating: false,
      };
    },
    methods: {
      async fetchArticles() {
        try {
          const responses = await bffAxios.get('/mycatalog');
          //const nameArticle = responses.data.articles.name;

          //const response = await bffAxios.get(`/${catalogId}/articles`);
          this.articles = responses.data.articles.name;
        } catch (error) {
          console.error(error);
        }
      },
      addItem() {
        this.form.articles.push();
      },
      updateItem(index, value) {
        this.$set(this.form.articles, index, value);
      },
      removeItem(index) {
        this.form.articles.splice(index, 1);
      },
      async createMenu() {
        try {
          const responses = await bffAxios.get('/mycatalog');
          const catalogId = responses.data._id;

          const response = await bffAxios.post(`/${catalogId}/menus`, this.form);
  
          // Réinitialisation des champs après la création réussie
          this.form.name = '';
          this.form.description = '';
          this.form.image = '';
          this.form.articles = [{}];
  
          // Faire quelque chose avec la réponse, si nécessaire
          console.log(response.data);
        } catch (error) {
          console.error(error);
          // Gérer les erreurs, afficher un message d'erreur, etc.
        }
      }
    },
    mounted() {
      this.fetchArticles();
      
      // Ajouter une classe pour activer l'animation après un délai
      setTimeout(() => {
        this.isRotating = true;
      }, 500);
    }
  };
  </script>
  
  <style scoped>
  .animated-title {
    transition: transform 1s;
  }
  
  .animated-title.green--text {
    color: green;
    transform: rotate(360deg);
  }
  </style>
  