import React from "react";
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { TodoProvider } from './context/TodoContext'
import { UserProvider } from "./context/UserContext";
import { TodoApp } from '../Pages/TodoApp/TodoApp';
import { Login } from "../Pages/Login/Login";

import './App.css';

function AppRoutes() {
  const routes = useRoutes([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
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
