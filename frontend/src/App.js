import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Todo from './views/Todo/Todo';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './components/Appheader';
import ResetPasswordPage from './views/Auth/ResetPassword';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='bottom-right'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/' element={<Todo/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forget-password' element={<ResetPasswordPage/>}></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;