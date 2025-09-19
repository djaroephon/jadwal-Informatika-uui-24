<template>
  <div class="relative">
    <button 
      class="fixed top-4 left-4 z-50 md:hidden bg-dark-700 p-2 rounded-lg shadow-lg"
      @click="isSidebarOpen = !isSidebarOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <aside 
      class="w-64 bg-dark-800 h-full flex flex-col border-r border-dark-700 fixed md:relative transform transition-transform duration-300 ease-in-out z-50"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <div class="p-5 border-b border-dark-700 flex justify-between items-center">
        <img 
          src="../assets/images/logo.png" 
          alt="Logo" 
          class="h-30 w-40 object-contain"
        >
        <button class="md:hidden text-gray-400 hover:text-white" @click="isSidebarOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 p-4 overflow-y-auto">
        <ul class="space-y-2">
          <li v-for="item in navigation" :key="item.name">
            <NuxtLink 
              :to="item.to" 
              class="flex items-center p-3 rounded-lg transition-all duration-200"
              :class="[isActive(item.to) ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-300 hover:bg-dark-700 hover:text-white']"
              @click="isSidebarOpen = false"
            >
              <span class="ml-3">{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav> 
    </aside>
  </div>
</template>

<script setup>
const route = useRoute()
const isSidebarOpen = ref(false)

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Todo List', to: '/todo' },
  { name: 'Jadwal', to: '/jadwal' },
]

const isActive = (path) => route.path === path

watch(() => route.path, () => {
  isSidebarOpen.value = false
})
</script>

<style scoped>
.nuxt-link-active {
  position: relative;
}

.nuxt-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background-color: rgb(14, 165, 233);
  border-radius: 0 4px 4px 0;
}

.transition-all {
  transition: all 0.3s ease;
}

@media (max-width: 767px) {
  aside {
    height: 100vh;
    top: 0;
    left: 0;
  }
}
</style>
