<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Todo List
      </h2>
      <button 
        @click="showAddForm = !showAddForm"
        class="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Todo
      </button>
    </div>

    <Transition name="fade">
      <div v-if="showAddForm" class="mb-6 p-5 bg-dark-800 rounded-lg border border-dark-700 shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-primary-300">Tambah Todo Baru</h3>
        <form @submit.prevent="addNewTodo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Isi Todo</label>
            <input 
              v-model="newTodo.isi" 
              required
              placeholder="Apa yang perlu dilakukan?"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Jenis</label>
            <select 
              v-model="newTodo.jenis"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="tugas">Tugas</option>
              <option value="pribadi">Pribadi</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div v-if="newTodo.jenis === 'tugas'">
            <label class="block text-sm font-medium mb-2">Mata Kuliah</label>
            <input 
              v-model="newTodo.mk"
              placeholder="Nama mata kuliah"
              class="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
          </div>
          <div class="flex space-x-3 pt-2">
            <button 
              type="submit"
              class="bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-lg transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Simpan
            </button>
            <button 
              type="button"
              @click="showAddForm = false"
              class="bg-dark-600 hover:bg-dark-700 px-5 py-2.5 rounded-lg transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-lg font-medium">Daftar Todo</h3>
      <div class="text-sm text-gray-400">
        Total: {{ todos.length }} todo
      </div>
    </div>

    <div class="space-y-4">
      <TransitionGroup name="list">
        <div 
          v-for="todo in todos" 
          :key="todo.id"
          class="p-5 bg-dark-800 rounded-lg border-l-4 transition-all duration-300 hover:shadow-lg"
          :class="{
            'border-primary-500': todo.jenis === 'tugas',
            'border-green-500': todo.jenis === 'pribadi',
            'border-purple-500': todo.jenis === 'lainnya'
          }"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-start">
                <div class="flex items-center h-6 mt-1 mr-3">
                  <input 
                    type="checkbox" 
                    :checked="todo.completed"
                    @change="toggleTodo(todo.id)"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-600 rounded"
                  >
                </div>
                <div>
                  <h3 class="font-medium" :class="{ 'line-through text-gray-500': todo.completed }">
                    {{ todo.isi }}
                  </h3>
                  <div class="text-sm mt-2 flex flex-wrap gap-2">
                    <span class="px-2 py-1 rounded-full text-xs" :class="getBadgeClass(todo.jenis)">
                      {{ formatJenis(todo.jenis) }}
                    </span>
                    <span v-if="todo.mk" class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                      {{ todo.mk }}
                    </span>
                    <span v-if="todo.completed" class="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                      Selesai
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              @click="confirmDelete(todo)"
              class="text-red-400 hover:text-red-300 transition-colors p-1 ml-2"
              title="Hapus todo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
      
      <div v-if="todos.length === 0" class="text-center py-10 bg-dark-800 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-gray-400">Tidak ada todo items</p>
        <p class="text-sm text-gray-500 mt-1">Klik "Tambah Todo" untuk membuat todo baru</p>
      </div>
    </div>

    <div v-if="todoToDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-dark-800 rounded-lg p-5 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-3">Hapus Todo</h3>
        <p class="text-gray-300">Apakah Anda yakin ingin menghapus todo "<span class="font-medium">{{ todoToDelete?.isi }}</span>"?</p>
        <div class="flex justify-end space-x-3 mt-5">
          <button @click="todoToDelete = null" class="px-4 py-2 rounded-lg bg-dark-600 hover:bg-dark-700 transition-colors">
            Batal
          </button>
          <button @click="removeTodo(todoToDelete.id)" class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { todos, addTodo, removeTodo, toggleTodo } = useTodos()

const showAddForm = ref(false)
const todoToDelete = ref(null)
const newTodo = ref({
  isi: '',
  jenis: 'tugas',
  mk: ''
})

const addNewTodo = () => {
  addTodo({
    isi: newTodo.value.isi,
    jenis: newTodo.value.jenis,
    mk: newTodo.value.jenis === 'tugas' ? newTodo.value.mk : undefined
  })
  
  newTodo.value = { isi: '', jenis: 'tugas', mk: '' }
  showAddForm.value = false
}

const confirmDelete = (todo) => {
  todoToDelete.value = todo
}

const formatJenis = (jenis) => {
  const jenisMap = {
    'tugas': 'Tugas',
    'pribadi': 'Pribadi',
    'lainnya': 'Lainnya'
  }
  return jenisMap[jenis] || jenis
}

const getBadgeClass = (jenis) => {
  const classes = {
    'tugas': 'bg-primary-500/20 text-primary-300',
    'pribadi': 'bg-green-500/20 text-green-300',
    'lainnya': 'bg-purple-500/20 text-purple-300'
  }
  return classes[jenis] || classes['lainnya']
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>