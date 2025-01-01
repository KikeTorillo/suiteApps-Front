import React from "react";

import { ListItem } from '../../atoms/ListItem/ListItem';
import { IconButton } from "../../atoms/IconButton/IconButton";

import './TodoListItem.css';

function TodoListItem({ text, done, completeTodo, deleteTodo }) {
    return (
        <ListItem>
            <IconButton
                iconStyle={done ? 'checkedButton' : 'uncheckButton'}
                onClick={completeTodo}
            />
            <p>{text}</p>
            <IconButton
                iconStyle="trashButton"
                onClick={deleteTodo}
            />

        </ListItem>
    );
}

export { TodoListItem }