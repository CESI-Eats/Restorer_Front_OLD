<template>
    <div>
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Modifier l'article</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="editedItem.name" label="Nom de l'article"></v-text-field>
            <v-textarea v-model="editedItem.description" label="Description de l'article"></v-textarea>
            <v-text-field v-model="editedItem.image" label="URL de l'image"></v-text-field>
            <v-text-field v-model="editedItem.price" label="Prix de l'article"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
            <v-btn color="blue darken-1" text @click="save">Sauvegarder</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-card v-for="article in articles" :key="article._id" class="pa-3 mb-2">
        <!-- Reste du code... -->
      </v-card>
    </div>
  </template>
  
  <script>
  import { bffAxios } from '@/services/axios';
  
  export default {
    data() {
      return {
        articles: [],
        editDialog: false,
        editedItem: {
          name: '',
          description: '',
          image: '',
          price: ''
        }
      };
    },
    async mounted() {
      // ...
    },
    methods: {
      editItem(item) {
        this.editedItem = Object.assign({}, item);
        this.editDialog = true;
      },
      close() {
        this.editDialog = false;
      },
      async save() {
        if (this.editedItem._id) {
            await bffAxios.put(`/${this.editedItem._id}/articles`, this.editedItem);
            const index = this.articles.findIndex(article => article._id === this.editedItem._id);
            Object.assign(this.articles[index], this.editedItem);
            this.close();
        }
        },
      // ...
    }
  };
  </script>
  