import Parse from 'parse';

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/parse';

const getCurrentUser = () => Parse.User.current();

const Todo = Parse.Object.extend('Todo');

// Create Todo
export const createTodo = async (text) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error('User must be logged in');
    return null;
  }

  const todo = new Todo();
  todo.set('text', text);
  todo.set('completed', false);
  todo.set('user', currentUser);

  try {
    await todo.save();
    return todo;
  } catch (error) {
    console.error('Error creating todo', error);
    return null;
  }
};

// Get All Todos
export const getTodos = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error('User must be logged in');
    return [];
  }

  const query = new Parse.Query(Todo);
  query.equalTo('user', currentUser);

  try {
    const todos = await query.find();
    return todos;
  } catch (error) {
    console.error('Error fetching todos', error);
    return [];
  }
};

// Get Todo by id
const getTodoById = async (todoId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error('User must be logged in');
    return null;
  }

  const query = new Parse.Query(Todo);
  query.equalTo('user', currentUser);

  try {
    const todo = await query.get(todoId);
    return todo;
  } catch (error) {
    console.error('Error fetching todo by ID', error);
    return null;
  }
};

// Update Todo
export const updateTodo = async (todoId, updatedText) => {
  const todo = await getTodoById(todoId);
  if (!todo) return null;

  todo.set('text', updatedText);

  try {
    await todo.save();
    return todo;
  } catch (error) {
    console.error('Error updating todo', error);
    return null;
  }
};

// Toggle Todo Completion
export const toggleTodoCompletion = async (todoId) => {
  const todo = await getTodoById(todoId);
  if (!todo) return null;

  todo.set('completed', !todo.get('completed'));

  try {
    await todo.save();
    return todo;
  } catch (error) {
    console.error('Error toggling completion', error);
    return null;
  }
};

// Delete Todo
export const deleteTodo = async (todoId) => {
  const todo = await getTodoById(todoId);
  if (!todo) return false;

  try {
    await todo.destroy();
    return true;
  } catch (error) {
    console.error('Error deleting todo', error);
    return false;
  }
};
