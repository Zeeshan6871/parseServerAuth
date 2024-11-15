import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, toggleTodoCompletion, deleteTodo, updateTodoWithImage } from '../services/todo.service';
import { toast } from 'react-toastify';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [currentTodoText, setCurrentTodoText] = useState('');
  const [currentTodoImage, setCurrentTodoImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all todos when component mounts
  useEffect(() => {
    setLoading(true);
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
      setLoading(false);
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

  // Handle file upload for a Todo
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedTodo = await updateTodoWithImage(currentTodoId, file);
        setTodos(todos.map(todo => (todo.id === currentTodoId ? updatedTodo : todo)));
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Error uploading image');
      }
    }
  };

  const openEditModal = (todoId, todoText, todoImage) => {
    setCurrentTodoId(todoId);
    setCurrentTodoText(todoText);
    setCurrentTodoImage(todoImage);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
      {loading ? (
        <div className='w-100 d-flex align-items-center justify-content-center'>
          <div className="spinner-border text-white-50" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) :
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {todos && todos.map((todo) => {
            const createdAt = formatDate(todo.createdAt);
            const updatedAt = formatDate(todo.updatedAt);

            return (
              <div key={todo.id} className="col">
                <div className="card shadow-sm">
                  <img
                    src={todo.get('image') ? todo.get('image').url() : 'bgImg.jpg'}
                    className="card-img-top"
                    alt="Todo Image"
                    style={{aspectRatio:"16/9",objectFit:"fill"}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{todo.get('text')}</h5>
                    <p className={`card-text ${todo.get('completed') ? 'text-success' : 'text-danger'}`}>
                      {todo.get('completed') ? 'Completed' : 'Not Completed'}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => toggleTodoCompletion(todo.id)}
                      >
                        {todo.get('completed') ? 'Mark as Incomplete' : 'Mark as Completed'}
                      </button>
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => openEditModal(todo.id, todo.get('text'), todo.get('image'))}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-dark fw-bold">Created: <i className='text-dark fw-semibold'>{createdAt}</i></p>
                      <p className="text-dark fw-bold">Updated:  <i className='text-dark fw-semibold'>{updatedAt}</i></p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }

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
              <div className="mt-3">
                <label htmlFor="fileUpload" className="form-label">Upload an image</label>
                <input
                  type="file"
                  id="fileUpload"
                  className="form-control"
                  onChange={handleFileUpload}
                />
              </div>
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
