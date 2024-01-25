import React, { useRef, useState } from 'react'
import { BoardColumnCard } from '../../redux/boardSlice'
import { setCardName } from '../../redux/boardSlice'
import { useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    card: BoardColumnCard,
    columnId: string,
    index: number
}

const Card = (props: Props) => {

    const [title, setTitle] = useState<string>(props.card.title)
    const [disable, setDisable] = useState<boolean>(true)
    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <Draggable key={props.card.id} draggableId={props.card.id} index={props.index}>
            {(provided) => (
                <li className={`mb-2 relative p-2 rounded-lg bg-slate-${disable ? '600' : '800'}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {disable ?
                        <p className='text-slate-300'>{title}</p>
                        :
                        <input
                            ref={inputRef}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => {
                                if (disable) {
                                    setDisable(false)
                                    inputRef.current?.focus()
                                } else {
                                    dispatch(setCardName({ columnId: props.columnId, cardId: props.card.id, title: title }))
                                    setDisable(true)
                                }
                            }} />
                    }
                    <button className='text-slate-400 absolute top-2 right-2' onClick={() => {
                        if (disable) {
                            setDisable(false)
                            inputRef.current?.focus()
                        } else {
                            dispatch(setCardName({ columnId: props.columnId, cardId: props.card.id, title: title }))
                            setDisable(true)
                        }
                    }}>
                        {
                            disable ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                        }
                    </button>
                </li>)}
        </Draggable>
    )
}

export default Card