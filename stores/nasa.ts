import { defineStore } from 'pinia'

export const useNasaStore = defineStore('nasa', {
  state: () => ({
    apod: null as any | null, // Menyimpan data APOD
  }),
  actions: {
    async fetchApod(date: string) {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`)
        const data = await response.json()
        this.apod = data
      } catch (error) {
        console.error('Error fetching APOD detail:', error)
        this.apod = null
      }
    },
    clearApod() {
      this.apod = null
    }
  }
})
