import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { getTodos } from '../../services/Todos/getTodos';
import { createAndUpdateTodo } from '../../services/Todos/createAndUpdateTodo';

const TodoContext = createContext();

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
        if (todo.toDo.toLowerCase().includes(searchValue.toLowerCase())) {
            if (!todo.done && filterTodo === 'progress') {
                return todo;
            } else if (todo.done && filterTodo === 'end') {
                return todo;
            }
        }
    });

    const deleteTodo = async (toDo) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => {
            return todo.toDo == toDo;
        });
        newTodos.splice(todoIndex, 1);
        const data = await createAndUpdateTodo(userSession.sub, newTodos);
        if (data.message === 'session expired') {
            navigate('/login');
        }
        setLoading(true);
    };

    const createTodo = async (text) => {
        const newTodos = [...todos];
        const todoContent = {
            toDo: text,
            done: false
        };
        newTodos.push(todoContent);
        if (text) {
            const data = await createAndUpdateTodo(userSession.sub, newTodos);
            if (data.message === 'session expired') {
                navigate('/login');
            }
            setOpenModal(false);
            setLoading(true);
        }
    };

    const completeTodo = async (toDo) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => {
            return todo.toDo == toDo;
        });

        //console.log(todoIndex);
        newTodos[todoIndex].done = !newTodos[todoIndex].done;

        const data = await createAndUpdateTodo(userSession.sub, newTodos);
        setLoading(true);
    };

    useEffect(() => {
        if (!userSession) {
            navigate('/login');
            return;
        }

        async function fetchTodos() {
            try {
                const data = await getTodos(userSession.sub);
                setLoading(false);
                setError(null);
                setTodos(data);
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
                completeTodo,
                totalTodos,
                searchValue,
                setSearchValue,
                searchedTodos,
                deleteTodo,
                openModal,
                setOpenModal,
                createTodo,
                filterTodo,
                setFilterTodo
            }
        }>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider }



