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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const apod = ref(null);

// Mengambil data APOD berdasarkan tanggal dari API NASA
const fetchApodDetail = async () => {
  const date = route.params.date; // Mendapatkan tanggal dari URL
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`);
    const data = await response.json();
    if (data && data.url) {
      apod.value = data;
    } else {
      apod.value = null;
    }
  } catch (error) {
    console.error('Error fetching APOD detail:', error);
    apod.value = null;
  }
};

const goBack = () => {
  router.push('/'); // Kembali ke halaman utama (index.vue)
};

onMounted(fetchApodDetail);
</script>
