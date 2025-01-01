import React from 'react'

import { TextInput } from '../../atoms/TextInput/TextInput'
import { TextContent } from '../../atoms/TextContent/TextContent'
import { Button } from '../../atoms/Button/Button'
import { ListGroup } from '../../atoms/ListGroup/ListGroup'
import { IconButton } from '../../atoms/IconButton/IconButton'
import { TodoListItem } from '../../molecules/TodoListItem/TodoListItem'
import { Loader } from '../../atoms/Loader/Loader'

import { Modal } from '../../../Modals/Modal'
import { TodoForm } from '../../molecules/TodoForm/TodoForm'

import './TodoTemplate.css'


function TodoTemplate({
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
}) {

    return (
        <div className='todoApp-container'>
            <div className='section-headers-container'>
                <TextContent textStyle="header-1">
                    Mis Pendientes
                </TextContent>
                <TextContent textStyle="body">
                    Has completado {completedTodos.length} de {totalTodos} to-do's
                </TextContent>
                <div className='search-filter-container'>
                    <TextInput type="text" placeholder="Buscar To-Do"
                        value={searchValue}
                        onChange={(event) => {
                            setSearchValue(event.target.value);
                        }}
                    />
                    <div className='todoFilter-container'>
                        <Button
                            text='En progreso'
                            className={filterTodo === 'progress' ? 'selected' : ''}
                            onClick={() => setFilterTodo('progress')}
                        />
                        <Button
                            text='Finalizado'
                            className={filterTodo === 'end' ? 'selected' + ' overButton' : '' + 'overButton'}
                            onClick={() => setFilterTodo('end')}
                        />
                    </div>
                </div>
            </div>
            {loading && (
                <div>
                    <Loader styleLoader='gearLoader' />
                </div>
            )

            }
            {error && (
                <div>
                    <p>Hubo un error al cargar To-dos</p>
                </div>
            )}
            {(loading === false && !error) && (
                <div className='todoList-container'>
                    <ListGroup>
                        {(!error && !loading && totalTodos === 0) && <p>Crea tu primer To-do</p>}
                        {searchedTodos.map((todo) => {
                            return <TodoListItem text={todo.to_do} key={todo.id} done={todo.done} completeTodo={() => completeTodo(todo)} deleteTodo={() => deleteTodo(todo.id)} />
                        })}
                    </ListGroup>
                    <IconButton
                        iconStyle='createTodoButton'
                        onClick={() => setOpenModal(!openModal)}
                    />
                </div>
            )
            }

            {openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}
        </div>
    );
}

export { TodoTemplate };