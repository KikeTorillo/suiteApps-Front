import React from "react";

import { ListItemDraggable } from "../../atoms/ListItemDraggable/ListItemDraggable";
import { IconButton } from "../../atoms/IconButton/IconButton";

import './TodoListItem.css';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function TodoListItem({ toDo,completeTodo, deleteTodo}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: toDo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="ListItem"
    >
      <IconButton
        iconStyle={toDo.done ? 'checkedButton' : 'uncheckButton'}
        onClick={completeTodo}
      />
      <p>{toDo.toDo}</p>
      <IconButton
        iconStyle="trashButton"
        onClick={deleteTodo}
      />

    </li>
  );
}

export { TodoListItem }