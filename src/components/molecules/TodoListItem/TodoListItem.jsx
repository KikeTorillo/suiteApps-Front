import React from "react";

import { ListItemDraggable } from "../../atoms/ListItemDraggable/ListItemDraggable";
import { IconButton } from "../../atoms/IconButton/IconButton";

import './TodoListItem.css';

function TodoListItem({ todo, completeTodo, deleteTodo }) {

    return (
        <ListItemDraggable
            id={todo.id}
        >
            <IconButton
                iconStyle={todo.done ? 'checkedButton' : 'uncheckButton'}
                onClick={completeTodo}
            />
            <p>{todo.toDo}</p>
            <IconButton
                iconStyle="trashButton"
                onClick={deleteTodo}
            />

        </ListItemDraggable>
    );
}

export { TodoListItem }