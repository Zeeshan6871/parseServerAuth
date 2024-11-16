import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, toggleTodoCompletion, deleteTodo, updateTodoWithImage } from '../services/todo.service';
import { toast } from 'react-toastify';

// Create the context
const TodoContext = createContext();

// Create the provider component
export const TodoProvider = ({ children }) => {
  const [state, setState] = useState({
    todos: [],
    newTodo: {
      text: '',
      image: null,
    },
    currentTodo: {
      id: null,
      text: '',
      image: null,
    },
    showModal: false,
    loading: false,
  });

  const { newTodo, currentTodo } = state;

  // Fetch all todos when component mounts
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setState((prevState) => ({ ...prevState, todos: fetchedTodos, loading: false }));
    };
    fetchTodos();
  }, []);

  // Handle form submit for creating a new Todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (newTodo.text.trim() === '') {
      toast.error('Todo cannot be empty');
      return;
    }

    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const newTodoItem = await createTodo(newTodo.text, newTodo.image);
      setState((prevState) => ({
        ...prevState,
        todos: [...prevState.todos, newTodoItem],
        newTodo: { text: '', image: null }, // Reset new todo state
      }));
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Error creating Todo');
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  // Handle file upload for new Todo
  const handleNewTodoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setState((prevState) => ({
        ...prevState,
        newTodo: { ...prevState.newTodo, image: file },
      }));
    }
  };

  // Handle updating the text of a Todo
  const handleUpdateTodo = async () => {
    try {
      const updatedTodo = await updateTodo(currentTodo.id, currentTodo.text);
      setState((prevState) => ({
        ...prevState,
        todos: prevState.todos.map(todo => (todo.id === currentTodo.id ? updatedTodo : todo)),
        showModal: false,
      }));
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Error updating Todo');
    }
  };

  // Handle delete todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setState((prevState) => ({
        ...prevState,
        todos: prevState.todos.filter(todo => todo.id !== todoId),
      }));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Error deleting Todo');
    }
  };

  // Handle toggle todo completion
  const handleToggleTodo = async (todoId) => {
    try {
      const updatedTodo = await toggleTodoCompletion(todoId);
      setState((prevState) => ({
        ...prevState,
        todos: prevState.todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      }));
    } catch (error) {
      toast.error('Error toggling Todo completion');
    }
  };

  // Handle file upload for editing a Todo
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedTodo = await updateTodoWithImage(currentTodo.id, file);
        setState((prevState) => ({
          ...prevState,
          todos: prevState.todos.map(todo => (todo.id === currentTodo.id ? updatedTodo : todo)),
        }));
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Error uploading image');
      }
    }
  };

  const openEditModal = (todoId, todoText, todoImage) => {
    setState((prevState) => ({
      ...prevState,
      currentTodo: { id: todoId, text: todoText, image: todoImage },
      showModal: true,
    }));
  };

  const closeModal = () => {
    setState((prevState) => ({ ...prevState, showModal: false }));
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  return (
    <TodoContext.Provider value={{
      state,
      handleCreateTodo,
      handleNewTodoFileUpload,
      handleUpdateTodo,
      handleDeleteTodo,
      handleToggleTodo,
      handleFileUpload,
      openEditModal,
      closeModal,
      formatDate,
      setState
    }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodoContext = () => {
  return useContext(TodoContext);
};
