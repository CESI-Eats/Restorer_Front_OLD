<template>
    <v-card>
      <v-card-title class="animated-title" :class="{ 'green--text': isRotating }">Créer un nouvel article</v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Nom de l'article"></v-text-field>
          <v-textarea v-model="description" label="Description de l'article"></v-textarea>
          <v-text-field v-model="image" label="URL de l'image"></v-text-field>
          <v-text-field v-model="price" label="Prix de l'article"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createArticle">Créer</v-btn>
        </v-card-actions>
      </v-card>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        description: '',
        image: '',
        price: '',
        isRotating: false,
      };
    },
    methods: {
      async createArticle() {
        try {
          const formData = new FormData();
          formData.append('name', this.name);
          formData.append('description', this.description);
          formData.append('image', this.image);
          formData.append('price', this.price);
  
          // Envoi de la requête API pour créer l'article
          const response = await axios.post('/api/articles', formData);
          
          // Réinitialisation des champs après la création réussie
          this.name = '';
          this.description = '';
          this.image = '';
          this.price = '';
  
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
  