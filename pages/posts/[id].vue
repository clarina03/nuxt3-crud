<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <button @click="goBack">Kembali</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref({});
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await fetchPost();
});

const fetchPost = async () => {
  const id = route.params.id;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await response.json();
  post.value = data;
};

const goBack = () => {
  router.push('/posts');
};
</script>
