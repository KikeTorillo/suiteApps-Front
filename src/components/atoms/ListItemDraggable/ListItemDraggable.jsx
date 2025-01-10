import React from "react";

import './ListItemDraggable.css';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ListItemDraggable({children, id}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            className="ListItem"
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            {children}
        </li>
    );
}

export { ListItemDraggable }