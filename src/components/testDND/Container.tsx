import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Item from './Item';
type Props = {}

const Container = (props: Props) => {

    const finalSpaceCharacters = [
        {
            id: 'gary',
            name: 'Gary Goodspeed',
            thumb: '/images/gary.png'
        },
        {
            id: 'cato',
            name: 'Cato the Younger',
            thumb: '/images/cato.png'
        },
        {
            id: 'kato',
            name: 'Kato the Older',
            thumb: '/images/kato.png'
        }
    ]

    return (
        <DragDropContext onDragEnd={() => { }}>
            <Droppable droppableId="characters" direction="horizontal">
                {(provided) => (
                    <ul className="characters flex" {...provided.droppableProps} ref={provided.innerRef}>
                        {finalSpaceCharacters.map(({ id, name, thumb }, index) => {
                            return <Item key={id} id={id} index={index} name={name} thumb={thumb} />
                        })
                        }
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Container