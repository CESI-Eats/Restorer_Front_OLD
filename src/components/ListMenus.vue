<template>
    <div>
        <h1>Menus</h1>
      <v-card v-for="menu in menus" :key="menu._id" class="mb-5">
        <v-card-title>{{ menu.name }}</v-card-title>
        <v-card-text>{{ menu.description }}</v-card-text>
        <v-img>{{ menu.image }}</v-img>
        <v-card-subtitle>{{ menu.price }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" @click="editMenu(menu)">Modifier</v-btn>
          <v-btn color="secondary" @click="deleteMenu(menu._id)">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import { bffAxios } from '@/services/axios';

export default {
  data() {
    return {
      menus: [],
    };
  },
  async created() {
    try {
      const response = await bffAxios.get('/mycatalog');
      this.menus = response.data.menus;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    editMenu(menu) {
      this.editedItem = Object.assign({}, menu);
      this.editDialog = true;
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
