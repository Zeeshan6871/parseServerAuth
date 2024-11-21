import {create} from 'zustand';

export const useTodoStore = create((set) => ({
  todos: [],
  newTodo: { text: '', image: null },
  currentTodo: { id: null, text: '', image: null },
  showModal: false,
  loading: false,

  // Set new state values
  setState: (newState) => set((state) => ({ ...state, ...newState })),

  // Actions
  createTodo: (newTodoItem) => set((state) => ({
    todos: [...state.todos, newTodoItem],
    newTodo: { text: '', image: null },
  })),

  updateTodo: (updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    showModal: false,
  })),

  deleteTodo: (todoId) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== todoId),
  })),

  toggleTodoCompletion: (selectedTodo) => set((state) => {
    return ({
    todos: state.todos.map((todo) =>
      todo.id === selectedTodo.id ? selectedTodo : todo
    ),
  })}),

  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
  openModal: (todo) => set(() => ({ currentTodo: todo, showModal: true })),
  closeModal: () => set(() => ({ showModal: false })),
}));
