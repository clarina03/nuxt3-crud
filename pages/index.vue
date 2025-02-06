<template>
  <div>
    <h1>Daftar Gambar APOD Favorit</h1>
    <ul v-if="apodList.length > 0">
      <li v-for="(apod, index) in apodList" :key="index">
        <img :src="apod.url" :alt="apod.title" width="200" />
        <p>{{ apod.title }}</p>
        <button @click="deleteApod(index)">Hapus</button>
        <button @click="viewDetail(apod.date)">Lihat Detail</button>
      </li> 
    </ul>
    <p v-else>Belum ada gambar APOD favorit.</p>
    <button @click="createApod" class="add-btn">Tambah Gambar APOD Favorit</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const apodList = ref([]);

// Mengambil APOD favorit dari storage atau API
const fetchApods = async () => {
  const storedApods = JSON.parse(localStorage.getItem('apodList')) || [];
  apodList.value = storedApods;
};

// Menambahkan gambar APOD favorit
const createApod = async () => {
  const date = prompt("Masukkan tanggal (YYYY-MM-DD) untuk APOD:");
  if (date) {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`);
      const data = await response.json();
      if (data && data.url) {
        const newApod = {
          date: date,
          title: data.title,
          url: data.url,
          explanation: data.explanation,
        };
        apodList.value.push(newApod);
        localStorage.setItem('apodList', JSON.stringify(apodList.value));
      } else {
        alert("Data tidak ditemukan atau format tidak valid.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengambil data.");
      console.error(error);
    }
  }
};

// Menghapus gambar APOD favorit
const deleteApod = (index) => {
  const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus?");
  if (isConfirmed) {
    apodList.value.splice(index, 1);
    localStorage.setItem('apodList', JSON.stringify(apodList.value));
  }
};

// Menampilkan detail gambar berdasarkan tanggal
const viewDetail = (date) => {
  router.push(`/apod/${date}`);
};

onMounted(fetchApods);

</script>
