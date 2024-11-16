import React from 'react';
import { useTodoContext } from '../store/todo.context';

const Home = () => {
  const {
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
  } = useTodoContext();

  const { todos, newTodo, currentTodo, showModal, loading } = state;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to React ParseServer Todo App</h1>

      {/* Todo Input Section */}
      <div className="card mb-4 shadow-sm border-0 rounded-lg">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Create New Todo</h5>
          <form onSubmit={handleCreateTodo}>
            <div className="mb-3">
              <label htmlFor="todoText" className="form-label">Todo Text</label>
              <input
                type="text"
                id="todoText"
                value={newTodo.text}
                onChange={(e) => {
                  const updatedNewTodo = { ...newTodo, text: e.target.value };
                  setState(prevState => ({ ...prevState, newTodo: updatedNewTodo }));
                }}
                placeholder="Enter your todo here"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="todoImage" className="form-label">Attach an Image</label>
              <input
                type="file"
                id="todoImage"
                onChange={handleNewTodoFileUpload}
                className="form-control"
                accept="image/*"
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">Add Todo</button>
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
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleToggleTodo(todo.id)}
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
                          onClick={() => handleDeleteTodo(todo.id)}
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
      )}

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
                value={currentTodo.text}
                onChange={(e) => setState((prevState) => ({
                  ...prevState,
                  currentTodo: { ...prevState.currentTodo, text: e.target.value },
                }))}
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
