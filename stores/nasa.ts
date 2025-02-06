import { defineStore } from 'pinia'

export const useNasaStore = defineStore('nasa', {
  state: () => ({
    apod: null as any,
  }),

  actions: {
    async fetchApod(date: string) {
      try {
        const { data } = await useFetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`)
        this.apod = data.value
      } catch (error) {
        console.error('Error fetching APOD detail:', error)
        this.apod = null
      }
    }
  }
})
