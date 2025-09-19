<template>
  <div class="bg-dark-700 p-4 rounded-lg text-center">
    <div class="text-3xl font-mono font-bold">{{ time }}</div>
    <div class="text-sm text-gray-400 mt-1">{{ date }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
const date = ref('')

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
  date.value = now.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 1000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>