<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <ClockWidget />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-dark-800 p-6 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Todo List Terbaru</h2>
        <div class="space-y-3">
          <div 
            v-for="todo in recentTodos" 
            :key="todo.id"
            class="p-3 bg-dark-700 rounded-lg flex items-center transition-all duration-200 hover:bg-dark-650"
          >
            <div class="w-3 h-3 rounded-full mr-3 flex-shrink-0" :class="{
              'bg-primary-500': todo.jenis === 'tugas',
              'bg-green-500': todo.jenis === 'pribadi',
              'bg-gray-500': todo.jenis === 'lainnya'
            }"></div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium">{{ todo.isi }}</p>
              <p v-if="todo.mk" class="text-xs text-gray-400 mt-1">
                {{ todo.mk }}
              </p>
            </div>
          </div>
        </div>
        <NuxtLink 
          to="/todo" 
          class="block mt-4 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors flex items-center"
        >
          Lihat semua
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

     <div class="bg-dark-800 p-6 rounded-lg">
  <h2 class="text-xl font-semibold mb-4">Jadwal Hari Ini</h2>
  <div class="space-y-3">
    <div 
      v-for="item in todaySchedule" 
      :key="item.id"
      class="p-3 bg-dark-700 rounded-lg transition-all duration-200 hover:bg-dark-650"
    >
      <div class="flex justify-between items-start">
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-primary-300">{{ item.namaMk }}</h3>
          <p class="text-sm text-gray-400 mt-1">{{ item.dosen }}</p>
        </div>
        <span class="text-sm bg-primary-500/20 text-primary-300 px-2 py-1 rounded ml-2 flex-shrink-0 whitespace-nowrap">
          {{ item.waktu }}
        </span>
      </div>
      <div class="text-xs text-gray-500 mt-2">{{ item.ruangan }}</div>
    </div>
  </div>

  <NuxtLink 
    to="/jadwal" 
    class="block mt-4 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors flex items-center"
  >
    Lihat jadwal lengkap
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-4 w-4 ml-1" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M9 5l7 7-7 7" 
      />
    </svg>
  </NuxtLink>
</div>
</div>
      <div id="live2d-container" class="flex justify-center">
        <!-- Waifu Komting sini -->
      </div>
</div>
</template>

<script setup>
const { todos } = useTodos()
const { jadwal } = useJadwal()

const recentTodos = computed(() => {
  return todos.value.slice(0, 3)
})

const todaySchedule = computed(() => {
  if (!jadwal.value) return []

  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
  const today = days[new Date().getDay()] 
console.log(today)

  return jadwal.value.filter(item => {
    if (!item.waktu) return false
    const parts = item.waktu.split("/")
    const day = parts[1]?.trim()
    return day === today
  })

})

onMounted(async () => {
  const model = [
   
    "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json"
  ]

  let index = 0
  function load() {
    L2Dwidget.init({
      model: { jsonPath: model[index] },
      display: { position: "left", width: 200, height: 400 },
      mobile: { show: true }
    })
  }
  load()
})

</script>

<style scoped>
.hover\:bg-dark-650:hover {
  background-color: rgba(30, 41, 59, 0.5);
}
</style>