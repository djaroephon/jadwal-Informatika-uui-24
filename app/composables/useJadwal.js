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
  {
    id: 2,
    namaMk: "Basis Data",
    waktu: "14:00-17:00/Selasa",
    dosen: "M. Bayu Wibawa, S.Ko., MMSI.",
    ruangan: "Lab Kom 1",
    sks: "3"
  },
  {
    id: 3,
    namaMk: "Jaringan Komputer",
    waktu: "08:00-12:00/Rabu",
    dosen: "Rizka Albar, S.Kom.,MT",
    ruangan: "Lab Kom 1",
    sks: "4"
  },
  {
    id: 4,
    namaMk: "Pemrograman Berorientasi Objek",
    waktu: "14:00-18:00/Rabu",
    dosen: "Mahendar Dwi Payana, S.ST.,MT",
    ruangan: "Lab Kom 1",
    sks: "4"
  },
  {
    id: 5,
    namaMk: "Organisasi dan Arsitektur Komputer",
    waktu: "14:00-16:00/Sabtu",
    dosen: "Rizka Albar, S.Kom.,MT",
    ruangan: "Lab Kom 1",
    sks: "2"
  },
  {
    id: 6,
    namaMk: "Logika Matematika",
    waktu: "10:00-13:00/Sabtu",
    dosen: "Mahyus Ihsan, M.Si ",
    ruangan: "Pustaka 2",
    sks: "3"
  },
  {
    id: 7,
    namaMk: "Database Management System",
    waktu: "14:00-17:00/Kamis",
    dosen: "M. Bayu Wibawa, S.Kom.,MMSI ",
    ruangan: "Lab Kom 1",
    sks: "3"
  },
  {
    id: 8,
    namaMk: "Scenario dan Design Game",
    waktu: "08:00-11:00/Senin",
    dosen: "Desita Ria Yusian TB, S.ST.,MT",
    ruangan: "Lab Kom 1",
    sks: "3"
  }
])

export function useJadwal() {
  return { jadwal }
}
