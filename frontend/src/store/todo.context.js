import React, { createContext, useState, useContext } from 'react';

// todo context
const TodoContext = createContext();

// todo context provider
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

  return (
    <TodoContext.Provider value={{state,setState }}>
      {children}
    </TodoContext.Provider>
  );
};

// hook to use the TodoContext
export const useTodoContext = () => {
  return useContext(TodoContext);
};
