import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from './routes/Root/Root'
import Register from './routes/Register/Register';
import Login from './routes/Login/Login';
import Todos from './routes/Todos/Todos';
import CreateTodo from './routes/Todos/CreateTodo/CreateTodo';
import DeleteTodo from './routes/Todos/DeleteTodo/DeleteTodo';
import User from './routes/User/User';
import UserChange from './routes/User/UserChange/UserChange';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/todos/create' element={<CreateTodo />} />
          <Route path='/todos/delete' element={<DeleteTodo />} />
          <Route path='/user' element={<User />} />
          <Route path='/user/change' element={<UserChange />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
