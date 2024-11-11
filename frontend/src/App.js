import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './components/Appheader';
import ResetPasswordPage from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='bottom-right'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forget-password' element={<ResetPasswordPage/>}></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;