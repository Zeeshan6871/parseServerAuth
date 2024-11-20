import Parse from "./parse.services";
const getCurrentUser = () => Parse.User.current();

const Todo = Parse.Object.extend('Todo');

// Create Todo
export const createTodo = async (newTodoText,newTodoImage) => {  
  const currentUser = getCurrentUser();
  const parseFile = await uploadFile(newTodoImage);
  if (!currentUser) {
    console.error('User must be logged in');
    return null;
  }

  const todo = new Todo();
  todo.set('text', newTodoText);
  todo.set('completed', false);
  todo.set('user', currentUser);
  todo.set('image', parseFile);

  try {
    await todo.save();
    return todo;
  } catch (error) {
    console.error('Error creating todo', error);
    return null;
  }
};


export const getTodos = async (onTodoChange) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.error('User must be logged in');
    return [];
  }

  const query = new Parse.Query('Todo');
  query.equalTo('user', currentUser);
  
  // const subscription = await query.subscribe();
  
  if (!currentUser) {
    console.error('User must be logged in');
    return [];
  }

  // subscription.on('open', () => {
  //   console.log('New Todo created'); 
  // });
  // subscription.on('create', (todo) => {
  //   console.log('New Todo created', todo);
  //   onTodoChange?.('create', todo); 
  // });

  // subscription.on('update', (todo) => {
  //   console.log('Todo updated', todo);
  //   onTodoChange?.('update', todo); 
  // });

  // subscription.on('delete', (todo) => {
  //   console.log('Todo deleted', todo);
  //   onTodoChange?.('delete', todo);
  // });

  try {
    const todos = await query.find();
    return { todos };
    // return { todos, subscription };
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

// Handle file upload
export const uploadFile = async (file) => {
  const parseFile = new Parse.File(file.name, file);

  try {
    await parseFile.save();
    return parseFile;
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
};

export const updateTodoWithImage = async (todoId, file) => {
  try {
    // Upload the file to Parse
    const parseFile = await uploadFile(file);

    const query = new Parse.Query(Todo);
    const todo = await query.get(todoId);

    // Set the uploaded file (image) to the Todo object
    todo.set('image', parseFile);

    // Save the updated Todo
    await todo.save();
    return todo;
  } catch (error) {
    throw new Error('Error updating Todo with image: ' + error.message);
  }
};