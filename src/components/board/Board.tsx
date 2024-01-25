import React from 'react'
import Column from './Column'
import CreateColumn from './CreateColumn'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux'
import { setColumns } from '../../redux/boardSlice'

type Props = {}

const Board = (props: Props) => {
    const { board } = useSelector((state: RootState) => state.board)
    const dispatch = useDispatch()
    const handleDropEnd = (result: any) => {
        if (!result.destination) return;

        const arr = [...board.columns];

        //Changing the position of Array element
        let removedItem = arr.splice(result.source.index, 1)[0];
        arr.splice(result.destination.index, 0, removedItem);

        //Updating the list
        dispatch(setColumns(arr));
    }

    return (
        <div className='board'>
            <DragDropContext onDragEnd={handleDropEnd}>
                <Droppable droppableId="columns" direction='horizontal'>
                    {(provided) => (
                        <div className="board_columns_container flex" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                board && board.columns && board.columns.length > 0 && board.columns.map((column, index) => {
                                    return <Column key={column.id} column={column} index={index} />
                                })
                            }
                            <CreateColumn index={board.columns.length} />
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Board