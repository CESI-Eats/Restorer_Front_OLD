<template>
    <AccountManagement/>
    <CreateArticleForm/>
    <CreateMenuForm/>
    <ListArticles/>
    <ListMenus/>
  </template>
  
  <script lang="ts">
  import {Options, Vue} from 'vue-class-component';
  import AccountManagement from "@/components/AccountManagement.vue"; // @ is an alias to /src
  import CreateArticleForm from "@/components/CreateArticleForm.vue"; // @ is an alias to /src
  import CreateMenuForm from "@/components/CreateMenuForm.vue"; // @ is an alias to /src
  import ListArticles from "@/components/ListArticles.vue"; // @ is an alias to /src
  import ListMenus from "@/components/ListMenus.vue"; // @ is an alias to /src

  
  @Options({
    components: {
      AccountManagement,
      CreateArticleForm,
      CreateMenuForm,
      ListArticles,
      ListMenus,
    },
  
  })
  export default class AccountManagementView extends Vue {
  }
  </script>