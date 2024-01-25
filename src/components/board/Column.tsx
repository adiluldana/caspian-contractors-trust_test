import React, { useState } from 'react'
import { BoardColumn, setCardName, setCards, setColumnName } from '../../redux/boardSlice'
import Card from './Card'
import { useDispatch } from 'react-redux'
import CreateCard from './CreateCard'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'



type Props = {
    column: BoardColumn,
    index: number
}

const Column = (props: Props) => {

    const [title, setTitle] = useState<string>(props.column.title)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
    const dispatch = useDispatch()

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(setTimeout(() => {
            dispatch(setColumnName({ columnId: props.column.id, title: e.target.value }))
        }, 300))
    }

    const handleDropEnd = (result: any) => {
        if (!result.destination) return;

        const arr = [...props.column.cards];

        //Changing the position of Array element
        let removedItem = arr.splice(result.source.index, 1)[0];
        arr.splice(result.destination.index, 0, removedItem);

        //Updating the list
        dispatch(setCards({ columnId: props.column.id, cards: arr }));
    }


    return <Draggable key={props.column.id} draggableId={props.column.id} index={props.index}>
        {(provided, snapshot) => (
            <div className='board_column-container p-1.5' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className="board_column p-2 rounded-xl">
                    <div className='board_column_header p-2 '>
                        <input type="text"
                            value={title}
                            className='bg-transparent border-0 font-bold'
                            onChange={(e) => handleChangeTitle(e)}
                        />
                    </div>
                    <div className="board_column_body">
                        <DragDropContext onDragEnd={handleDropEnd}>
                            <Droppable droppableId={`column-${props.column.id}`} >
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {
                                            props.column.cards && props.column.cards.length > 0 && props.column.cards.map((card, index) => {
                                                return <Card key={card.id} card={card} columnId={props.column.id} index={index} />
                                            })
                                        }
                                        <CreateCard columnId={props.column.id} />
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="board_column_footer">

                    </div>
                </div>
            </div>)}
    </Draggable>
}

export default Column