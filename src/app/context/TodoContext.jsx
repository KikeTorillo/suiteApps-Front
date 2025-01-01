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
    const fakeTodos = [{ text: 'SOY MAYUSCULA', done: true }, { text: 'revisar lavadora', done: true }, { text: 'ejemplo', done: false }];
    const { tokenSession } = useContext(UserContext);

    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('')
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
        const data = await updateTodoService(urlBackend, tokenSession.token, tokenSession.user.id, id, done);
    };

    const deleteTodo = async (todoId) => {
        setLoading(true);
        const data = await deleteTodoService(urlBackend, tokenSession.token, tokenSession.user.id, todoId);
    };

    const addNewTodo = async (text) => {
        setLoading(true);
        const data = await createTodo(urlBackend, tokenSession.token, tokenSession.user.id, text);
        setOpenModal(false);
    };

    useEffect(() => {
        if (!tokenSession) {
            navigate('/login');
            return;
        }

        async function fetchTodos() {
            try {
                const data = await getTodos(urlBackend, tokenSession.token, tokenSession.user.id);
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



