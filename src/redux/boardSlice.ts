import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { generateGuid } from '../helper/generateGuid';


export interface BoardColumnCard {
    id:string
    title:string
}

export interface BoardColumn {
    id:string
    title:string
    cards:BoardColumnCard[]
} 

interface Board {
    columns: BoardColumn[]
}

interface BoardState {
    board: Board
}

const initialState:BoardState = {
    board: {
        columns: [{
            id: generateGuid(),
            title: 'Column 1',
            cards: [{id: generateGuid(), title: 'Card 1.1'},{id: generateGuid(), title: 'Card 1.2'}]
        },
        {
            id: generateGuid(),
            title: 'Column 2',
            cards: [{id: generateGuid(), title: 'Card 2.1'},{id: generateGuid(), title: 'Card 2.2'}]
        }
    ]
    }
}

interface CreateCardResponse {
    card:BoardColumnCard,
    columnId:string
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setColumns:(state, action:PayloadAction<BoardColumn[]>)=>{
            state.board.columns = action.payload
        },
        setCards:(state, action:PayloadAction<{columnId:string, cards:BoardColumnCard[]}>) => {
            state.board.columns.forEach((column) => {
                if (column.id === action.payload.columnId) {
                    column.cards = action.payload.cards
                }
            })
        },
        addColumn: (state, action: PayloadAction<BoardColumn>) => {
            state.board.columns.push(action.payload)
        },
        addCard: (state, action:PayloadAction<CreateCardResponse>) => {
            state.board.columns.forEach((column) => {
                if (column.id === action.payload.columnId) {
                    column.cards.push(action.payload.card)
                    
                }
            })
        },
        setColumnName: (state, action:PayloadAction<{columnId:string, title:string}>) => {
            state.board.columns.forEach((column) => {
                if (column.id === action.payload.columnId) {
                    column.title = action.payload.title
                    console.log(action.payload)
                }
            })
        },
        setCardName: (state, action:PayloadAction<{columnId:string, cardId:string, title:string}>) => {
            state.board.columns.forEach((column) => {
                if (column.id === action.payload.columnId) {
                    column.cards.forEach((card) => {
                        if (card.id === action.payload.cardId) {
                            card.title = action.payload.title
                        }
                    })
                }
            })
        }
    }
})

export const {addColumn, addCard, setColumnName, setCardName, setColumns, setCards} = boardSlice.actions
export default boardSlice.reducer