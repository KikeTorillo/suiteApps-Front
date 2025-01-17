import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { getTodos } from '../../services/Todos/getTodos';
import { createUpdateDeleteTodo } from '../../services/Todos/createUpdateDeleteTodo';

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

    const todosFiltered = todos.filter((todo) => {
        if (todo.toDo.toLowerCase().includes(searchValue.toLowerCase())) {
            if (!todo.done && filterTodo === 'progress') {
                return todo.toDo;
            } else if (todo.done && filterTodo === 'end') {
                return todo.toDo;
            }
        }
    });

    const searchedTodos = todosFiltered.map((todo) => {
        return {...todo,id:todo.toDo};
    });

    const deleteTodo = async (toDo) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo) => {
            return todo.toDo == toDo;
        });
        newTodos.splice(todoIndex, 1);
        const data = await createUpdateDeleteTodo(userSession.sub, newTodos);
        if (data.message === 'session expired' && data.error) {
            navigate('/login');
            return;
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
            const data = await createUpdateDeleteTodo(userSession.sub, newTodos);
            if (data.message === 'session expired' && data.error) {
                navigate('/login');
                return;
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
        newTodos[todoIndex].done = !newTodos[todoIndex].done;
        const data = await createUpdateDeleteTodo(userSession.sub, newTodos);
        if (data.message === 'session expired' && data.error) {
            navigate('/login');
            return;
        }
        setLoading(true);
    };

    const updateTodosOrder = async (toDos) => {
        const newTodos = toDos;
        const data = await createUpdateDeleteTodo(userSession.sub, newTodos);
        if (data.message === 'session expired' && data.error) {
            navigate('/login');
            return;
        }
        setLoading(true);
    };

    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await getTodos(userSession.sub);
                if (data.message === 'session expired' && data.error) {
                    navigate('/login');
                    return;
                }
                setLoading(false);
                setError(null);
                setTodos(data);
            } catch (error) {
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
                setFilterTodo,
                todos,
                updateTodosOrder
            }
        }>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider }



