import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    id: string
    name: string
    thumb: string
    index: number
}

function Item(props: Props) {
    return (
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    Hello
                </li>
            )}
        </Draggable>
    )
}

export default Item