import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { todoService } from 'services';
import Loader from '../../components/Loader';
import DynamicModal from '../../components/Modals/DynamicModal';
import AddTodo from './AddTodo';
import { todoStore } from 'store';

const Todo = () => {
  const {
    todos, newTodo, currentTodo, showModal, loading,
    setState, createTodo, updateTodo, deleteTodo, toggleTodoCompletion,
    setLoading, openModal, closeModal
  } = todoStore.useTodoStore((store => store));
  

  // live query subscription
  useEffect(() => {
    // Fetch all todos initially
    const onTodoChange = (action, todo) => {
      switch (action) {
        case 'create':
          createTodo(todo);
          break;
        case 'update':
          updateTodo(todo);
          break;
        case 'delete':
          deleteTodo(todo.id);
          break;
        default:
          break;
      }
    };

    let mySubscription = null;
    
    const fetchTodos = async () => {
      setLoading(true);
      const { subscription, todos } = await todoService.getTodos(onTodoChange);
      mySubscription = subscription;
      
      setState({ todos, loading: false });
    };

    fetchTodos();

    // Cleanup function to unsubscribe from live queries when component unmounts
    return () => {
      if (mySubscription) {
        mySubscription.unsubscribe();
      }
    };
  }, [setState, createTodo, updateTodo, deleteTodo, setLoading]);

  // Handle form submit for creating a new Todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      if (!newTodo.text) {
        throw new Error("Title should be there")
      }
  
      if(!newTodo.image){
        throw new Error("Image shold be selected");
      }
      const newTodoItem = await todoService.createTodo(newTodo.text, newTodo.image);
      createTodo(newTodoItem);
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload for new Todo
  const handleNewTodoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setState({
        newTodo: { ...newTodo, image: file },
      });
    }
  };

  // Handle updating the text of a Todo
  const handleUpdateTodo = async () => {
    try {
      if(!currentTodo.text){
        throw new Error("Title can not be empty");
      }
      const updatedTodo = await todoService.updateTodo(currentTodo.id, currentTodo.text);
      updateTodo(updatedTodo);
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle delete todo
  const handleDeleteTodo = async (todoId) => {
    try {
      await todoService.deleteTodo(todoId);
      deleteTodo(todoId);
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Error deleting Todo');
    }
  };

  // Handle toggle todo completion
  const handleToggleTodo = async (todoId) => {
    try {
      const updatedTodo = await todoService.toggleTodoCompletion(todoId);
      toggleTodoCompletion(updatedTodo);
    } catch (error) {
      toast.error('Error toggling Todo completion');
    }
  };

  // Handle file upload for editing a Todo
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedTodo = await todoService.updateTodoWithImage(currentTodo.id, file);
        updateTodo(updatedTodo);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Error uploading image');
      }
    }
  };

  const openEditModal = (todoId, todoText, todoImage) => {
    openModal({ id: todoId, text: todoText, image: todoImage });
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

      {/* Add Todo */}
      <AddTodo newTodo={newTodo} handleCreateTodo={handleCreateTodo} handleNewTodoFileUpload={handleNewTodoFileUpload} />

      {/* Todo List Section */}
      {loading ? (
        <div className='w-100 d-flex align-items-center justify-content-center'>
          <Loader />
        </div>
      ) : (
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
                    alt="TodoImage"
                    style={{ aspectRatio: "16/9", objectFit: "fill" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{todo.get('text')}</h5>
                    <p className={`card-text ${todo.get('completed') ? 'text-success' : 'text-danger'}`}>
                      {todo.get('completed') ? 'Completed' : 'Not Completed'}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <button className="btn btn-outline-info btn-sm" onClick={() => handleToggleTodo(todo.id)}>
                        {todo.get('completed') ? 'Mark as Incomplete' : 'Mark as Completed'}
                      </button>
                      <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(todo.id, todo.get('text'), todo.get('image'))}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(todo.id)}>
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
      )}

      {/* Bootstrap Modal for Editing Todo */}
      <DynamicModal showModal={showModal} onClose={closeModal} onSave={handleUpdateTodo}>
        <input
          type="text"
          className="form-control"
          value={currentTodo.text}
          onChange={(e) => setState({
            currentTodo: { ...currentTodo, text: e.target.value }
          })}
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
      </DynamicModal>
    </div>
  );
};

export default Todo;
