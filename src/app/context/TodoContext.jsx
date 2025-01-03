import { useState, createContext, useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/useLocalStorage'

import { UserContext } from './UserContext';

import { getTodos } from '../../services/Todos/getTodos';
import { createTodo } from '../../services/Todos/createTodo';
import { deleteTodoService } from '../../services/Todos/deleteTodo';
import { updateTodoService } from '../../services/Todos/updateTodo';


const TodoContext = createContext();
const mode = import.meta.env.VITE_MODE;
let urlBackend = '';
if (mode !== 'local') {
    urlBackend = import.meta.env.VITE_HOST_VERCEL;
} else {
    urlBackend = import.meta.env.VITE_HOST_LOCAL;
}

function TodoProvider({ children }) {
    let userSession = null;
    if (sessionStorage.getItem('sessionUser')) {
        userSession = JSON.parse(sessionStorage.getItem('sessionUser'));
    }
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filterTodo, setFilterTodo] = useState('progress');
    const [openModal, setOpenModal] = useState(false);
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => {
        if (todo.done) {
            return todo;
        }
    });

    const searchedTodos = todos.filter((todo) => {
        if (todo.to_do.toLowerCase().includes(searchValue.toLowerCase())) {
            if (!todo.done && filterTodo === 'progress') {
                return todo;
            } else if (todo.done && filterTodo === 'end') {
                return todo;
            }
        }
    });

    const completeTodo = async (todo) => {
        const id = todo.id;
        const done = !todo.done;
        setLoading(true);
        const data = await updateTodoService(urlBackend, userSession.sub, id, done);
        if (data.message === 'session expired') {
            navigate('/login');
        }
    };

    const deleteTodo = async (todoId) => {
        setLoading(true);
        const data = await deleteTodoService(urlBackend, userSession.sub, todoId);
        if (data.message === 'session expired') {
            navigate('/login');
        }
    };

    const addNewTodo = async (text) => {
        setLoading(true);
        const data = await createTodo(urlBackend, userSession.sub, text);
        if (data.message === 'session expired') {
            navigate('/login');
        }
        setOpenModal(false);
    };

    useEffect(() => {
        if (!userSession) {
            navigate('/login');
            return;
        }

        async function fetchTodos() {
            try {
                const data = await getTodos(urlBackend, userSession.sub);
                setTimeout(() => {
                    setTodos(data);
                    setLoading(false);
                    setError(null);
                }, 1000);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }
        fetchTodos();
    }, [loading]);

    return (
        <TodoContext.Provider value={
            {
                loading,
                error,
                completedTodos,
                totalTodos,
                searchValue,
                setSearchValue,
                searchedTodos,
                completeTodo,
                deleteTodo,
                openModal,
                setOpenModal,
                addNewTodo,
                filterTodo,
                setFilterTodo
            }
        }>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider }



