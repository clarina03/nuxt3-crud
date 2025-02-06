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
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNasaStore } from '~/stores/nasa' // Pastikan path benar

const route = useRoute()
const router = useRouter()
const nasaStore = useNasaStore() // Mengakses store Pinia

const { apod } = storeToRefs(nasaStore) // Mengambil data apod dari store

onMounted(() => {
  const date = route.params.date
  nasaStore.fetchApod(date) // Memanggil action untuk fetch data APOD
})

const goBack = () => {
  router.push('/') // Kembali ke halaman utama
}

const clearApod = () => {
  nasaStore.clearApod() // Menghapus data APOD dari store
}
</script>
