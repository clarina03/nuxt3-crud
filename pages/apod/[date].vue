<template>
  <div>
    <h1>Detail Gambar APOD</h1>
    <div v-if="apod">
      <img :src="apod.url" :alt="apod.title" width="400" />
      <p><strong>{{ apod.title }}</strong></p>
      <p>{{ apod.explanation }}</p>
    </div>
    <p v-else>Data tidak ditemukan.</p>
    <button @click="goBack" class="go-back-btn">Kembali ke Halaman Utama</button>
  </div>
</template>

<script setup>
import { useNasaStore } from '~/stores/nasa'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const nasaStore = useNasaStore()
const apod = ref(null);

// Ambil data APOD berdasarkan tanggal dari route params
watchEffect(() => {
  if (route.params.date) {
    nasaStore.fetchApod(route.params.date)
  }
})

const goBack = () => {
  router.push('/'); // Kembali ke halaman utama (index.vue)
};

onMounted(fetchApodDetail);
</script>
