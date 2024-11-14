import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, toggleTodoCompletion, deleteTodo } from '../services/todo.service';
import { toast } from 'react-toastify';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [currentTodoId, setCurrentTodoId] = useState(null); // Store the ID of the todo being edited
  const [currentTodoText, setCurrentTodoText] = useState(''); // Store the text of the todo being edited

  // Fetch all todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  // Handle form submit for creating a new Todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') {
      toast.error('Todo cannot be empty');
      return;
    }

    try {
      const newTodo = await createTodo(newTodoText);
      setTodos([...todos, newTodo]);
      setNewTodoText('');
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Error creating Todo');
    }
  };

  // Handle updating the text of a Todo
  const handleUpdateTodo = async () => {
    try {
      const updatedTodo = await updateTodo(currentTodoId, currentTodoText);
      setTodos(todos.map(todo => (todo.id === currentTodoId ? updatedTodo : todo)));
      setShowModal(false); // Close modal after update
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Error updating Todo');
    }
  };

  // Handle toggling completion of a Todo
  const handleToggleCompletion = async (todoId) => {
    try {
      const updatedTodo = await toggleTodoCompletion(todoId);
      setTodos(todos.map(todo => (todo.id === todoId ? updatedTodo : todo)));
      toast.info(`Todo marked as ${updatedTodo.get('completed') ? 'completed' : 'incomplete'}`);
    } catch (error) {
      toast.error('Error toggling completion status');
    }
  };

  // Handle deleting a Todo
  const handleDeleteTodo = async (todoId) => {
    try {
      const success = await deleteTodo(todoId);
      if (success) {
        setTodos(todos.filter(todo => todo.id !== todoId));
        toast.success('Todo deleted successfully');
      }
    } catch (error) {
      toast.error('Error deleting Todo');
    }
  };

  // Open modal to edit todo
  const openEditModal = (todoId, todoText) => {
    setCurrentTodoId(todoId);
    setCurrentTodoText(todoText);
    setShowModal(true); // Show the modal
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to React ParseServer Todo App</h1>

      {/* Todo Input Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleCreateTodo} className="text-center">
            <div className="input-group">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Enter new todo"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">Add Todo</button>
            </div>
          </form>
        </div>
      </div>

      {/* Todo List Section */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {todos && todos.map((todo) => (
          <div key={todo.id} className="col">
            <div className="card shadow-sm">
              <img 
                src="bgImg.jpg" 
                className="card-img-top" 
                alt="Todo Image"
              />
              <div className="card-body">
                <h5 className="card-title">{todo.get('text')}</h5>
                <p className={`card-text ${todo.get('completed') ? "text-success" : "text-danger"}`}>
                  {todo.get('completed') ? 'Completed' : 'Not Completed'}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-outline-info btn-sm"
                    onClick={() => handleToggleCompletion(todo.id)}
                  >
                    {todo.get('completed') ? 'Mark as Incomplete' : 'Mark as Completed'}
                  </button>
                  <div>
                    <button 
                      className="btn btn-warning btn-sm me-2" 
                      onClick={() => openEditModal(todo.id, todo.get('text'))}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal for Editing Todo */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={currentTodoText}
                onChange={(e) => setCurrentTodoText(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateTodo}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
