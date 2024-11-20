import { useTodoContext } from "../../myStore/todo.context";

const EditingModal = (prop)=>{
    const { setState } = useTodoContext();
    return (
        <div className={`modal fade ${prop.showModal ? 'show' : ''}`} style={{ display: prop.showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!prop.showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={prop.closeModal}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={prop.currentTodo.text}
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
                  onChange={prop.handleFileUpload}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={prop.closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={prop.handleUpdateTodo}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default EditingModal;