import React from "react";
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { TodoProvider } from './context/TodoContext'
import { UserProvider } from "./context/UserContext";
import { TodoApp } from '../Pages/TodoApp/TodoApp';
import { LoginRegister } from "../Pages/LoginRegister/LoginRegister"; 
import { ResetPass } from "../Pages/ResetPass/ResetPass"; 

import './App.css';

function AppRoutes() {
  const routes = useRoutes([
    { path: '/', element: <LoginRegister /> },
    { path: '/login', element: <LoginRegister /> },
    { path: '/resetpass', element: <ResetPass /> },
    { path: '/todo-app', element: <TodoProvider><TodoApp /></TodoProvider> },
    { path: '/*', element: '' },
  ])
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>

  );
}

export default App
