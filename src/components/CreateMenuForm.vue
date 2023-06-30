<template>
<v-row justify="center">
    <v-col cols="12" sm="8" md="6">
    <v-card>
      <v-card-title class="animated-title" :class="{ 'green--text': isRotating }" style="text-align: center;">Créer un nouveau menu</v-card-title>
    <v-card-subtitle>articles: {{ this.form.articles }}</v-card-subtitle>
      <v-card-text>
        <v-text-field v-model="form.name" label="Nom du menu"></v-text-field>
        <v-textarea v-model="form.description" label="Description du menu"></v-textarea>
        <v-text-field v-model="form.image" label="Image du menu"></v-text-field>
        <v-text-field v-model="articleToAdd" label="Id de l'article"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addItem">Ajouter un article</v-btn>
        <v-btn color="primary" @click="createMenu">Créer</v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
    </v-row>
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
          articles: [],
        },
        articleToAdd: '',
        isRotating: false,
      };
    },
    methods: {
      addItem() {
        this.form.articles.push(this.articleToAdd);
        this.articleToAdd = '';
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
          this.form.articles = '';
  
          // Faire quelque chose avec la réponse, si nécessaire
          console.log(response.data);
        } catch (error) {
          console.error(error);
          // Gérer les erreurs, afficher un message d'erreur, etc.
        }
      }
    },
    mounted() {
      
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
