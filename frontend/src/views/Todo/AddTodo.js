import { useTodoContext } from "../../store/todo.context";

const AddTodo = ({newTodo,handleCreateTodo,handleNewTodoFileUpload})=>{
    const {setState}= useTodoContext();
    return (
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
    )
}

export default AddTodo;