<template>
    <div>
        <h1>Articles</h1>
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
        <v-card-actions>
          <v-btn color="primary" @click="editArticle(article)">Modifier</v-btn>
          <v-btn color="secondary" @click="deleteArticle(article._id)">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script>
  import { bffAxios } from '@/services/axios';
  
  export default {
    data() {
      return {
        articles: [],
      };
    },
    async created() {
      try {
        const response = await bffAxios.get('/mycatalog');
        this.articles = response.data.articles;
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
        editArticle(article) {
      this.editedItem = Object.assign({}, article);
      this.editDialog = true;
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