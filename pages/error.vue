<template>
    <div class="error-page">
      <h1 v-if="error.statusCode === 404">Page Not Found</h1>
      <h1 v-else>Error {{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
      <nuxt-link to="/">Go to Home</nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    async asyncData({ error }) {
      return { error }
    },
    head() {
      return {
        title: `Error ${this.error.statusCode}`
      }
    }
  }
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    padding: 50px;
  }
  .error-page h1 {
    font-size: 2rem;
    color: red;
  }
  .error-page p {
    font-size: 1rem;
    margin-top: 20px;
  }
  </style>
  