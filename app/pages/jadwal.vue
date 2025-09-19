<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Jadwal Mata Kuliah
      </h1>
    </div>

    <div class="bg-dark-800 rounded-lg overflow-hidden shadow-lg">
      <div class="p-4 border-b border-dark-700 flex justify-between items-center">
        <h2 class="text-xl font-semibold">Daftar Jadwal</h2>
        <span class="text-sm text-gray-400">{{ jadwal.length }} jadwal</span>
      </div>
      
      <div class="overflow-x-auto">
        <div class="hidden md:block">
          <table class="w-full table-fixed border-collapse">
            <thead>
              <tr class="bg-dark-700">
                <th class="w-12 px-2 py-3 text-center text-sm font-medium text-gray-200 border-b border-dark-600">No</th>
                <th class="w-30 px-4 py-3 text-left text-sm font-medium text-gray-200 border-b border-dark-600">Mata Kuliah</th>
                <th class="w-32 px-2 py-3 text-left text-sm font-medium text-gray-200 border-b border-dark-600">Waktu/Hari</th>
                <th class="w-28 px-2 py-3 text-left text-sm font-medium text-gray-200 border-b border-dark-600">Dosen</th>
                <th class="w-20 px-2 py-3 text-left text-sm font-medium text-gray-200 border-b border-dark-600">Ruang</th>
                <th class="w-16 px-2 py-3 text-center text-sm font-medium text-gray-200 border-b border-dark-600">SKS</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in jadwal" 
                :key="item.id"
                class="border-b border-dark-600 hover:bg-dark-750 transition-colors"
              >
                <td class="w-12 px-2 py-3 text-sm text-gray-300 text-center">{{ index + 1 }}</td>
                <td class="max-w-[150px] text-sm font-medium text-primary-300 truncate" :title="item.namaMk">
                  {{ item.namaMk }}
                </td>
                <td class="w-32 px-2 py-3 text-sm text-gray-300 truncate" :title="item.waktu">{{ item.waktu }}</td>
                <td class="w-28 px-2 py-3 text-sm text-gray-300 truncate" :title="item.dosen">{{ item.dosen }}</td>
                <td class="w-20 px-2 py-3 text-sm text-gray-300 truncate" :title="item.ruangan">{{ item.ruangan }}</td>
                <td class="w-16 px-2 py-3 text-center">
                  <span class="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                    {{ item.sks }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="md:hidden">
          <div 
            v-for="(item, index) in jadwal" 
            :key="item.id"
            class="border-b border-dark-600 p-4 hover:bg-dark-750 transition-colors"
          >
            <div class="flex items-start mb-3">
              <span class="bg-primary-500/20 text-primary-300 text-xs px-2 py-1 rounded mr-2">
                {{ index + 1 }}
              </span>
              <h3 class="font-medium text-primary-300">{{ item.namaMk }}</h3>
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p class="text-gray-400 mb-1">Waktu/Hari</p>
                <p class="text-gray-300">{{ item.waktu }}</p>
              </div>
              <div>
                <p class="text-gray-400 mb-1">Ruangan</p>
                <p class="text-gray-300">{{ item.ruangan }}</p>
              </div>
              <div>
                <p class="text-gray-400 mb-1">SKS</p>
                <span class="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs inline-block">
                  {{ item.sks }} SKS
                </span>
              </div>
              <div class="col-span-2">
                <p class="text-gray-400 mb-1">Dosen</p>
                <p class="text-gray-300">{{ item.dosen }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="jadwal.length === 0" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-400 text-lg font-medium">Tidak ada jadwal mata kuliah</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { jadwal } = useJadwal()
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  position: sticky;
  top: 0;
  background-color: rgb(55, 65, 81);
  z-index: 10;
}

tr:last-child td {
  border-bottom: none;
}

.hover\:bg-dark-750:hover {
  background-color: rgb(45, 55, 72);
}
</style>
