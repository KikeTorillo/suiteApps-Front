import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../../app/context/TodoContext'

import { TodoTemplate } from '../../components/templates/TodoTemplate/TodoTemplate'

import { Modal } from '../../Modals/Modal'
import { TodoForm } from '../../components/molecules/TodoForm/TodoForm'

import './TodoApp.css'


function TodoApp() {

    const {
        loading,
        error,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        searchValue,
        setSearchValue,
        completedTodos,
        totalTodos,
        filterTodo,
        setFilterTodo
    } = useContext(TodoContext);

    return (
        <TodoTemplate
        loading={loading}
        error={error}
        searchedTodos={searchedTodos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        openModal={openModal}
        setOpenModal={setOpenModal}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        completedTodos={completedTodos}
        totalTodos={totalTodos}
        filterTodo={filterTodo}
        setFilterTodo={setFilterTodo}
        />
    );
}

export { TodoApp };