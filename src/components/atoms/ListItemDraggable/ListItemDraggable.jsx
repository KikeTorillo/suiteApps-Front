import React from "react";

import './ListItemDraggable.css';

function ListItemDraggable({ children, idTodo }) {

    return (
        <li
            className="ListItem"
        >
            {children}
        </li>
    );
}

export { ListItemDraggable }