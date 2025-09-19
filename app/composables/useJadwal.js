import { ref } from 'vue'

const jadwal = ref([
  {
    id: 1,
    namaMk: "Leadership dan Entrepreneurship",
    waktu: "08:00-11:00/Kamis",
    dosen: "Soraya Lestari, SE., M.Si",
    ruangan: "M Lt 3 ",
    sks: "3"
  },
  
])

export function useJadwal() {
  return { jadwal }
}
