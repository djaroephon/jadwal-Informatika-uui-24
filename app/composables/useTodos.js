import { watch, onMounted } from 'vue'

export const useTodos = () => {
  const todos = useState('todos', () => [])

  onMounted(() => {
    const stored = localStorage.getItem('todos')
    if (stored) {
      todos.value = JSON.parse(stored)
    }
  })

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos))
    },
    { deep: true }
  )

  const addTodo = (todo) => {
    const newId =
      todos.value.length > 0
        ? Math.max(...todos.value.map((t) => t.id)) + 1
        : 1

    todos.value.push({
      id: newId,
      completed: false,
      ...todo,
    })
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  }
}
