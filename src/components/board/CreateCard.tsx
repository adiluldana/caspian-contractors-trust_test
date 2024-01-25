import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BoardColumnCard, addCard } from '../../redux/boardSlice';
import { generateGuid } from '../../helper/generateGuid';

type Props = {
    columnId: string
}

const CreateCard = (props: Props) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const modalRef = useRef<HTMLDivElement | null>(null)
    const titleRef = useRef<HTMLInputElement | null>(null)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (e.target === modalRef.current) {
            handleClose()
        }
    }

    const handleSaveColumn = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newCard: BoardColumnCard = {
            id: generateGuid(),
            title: title
        }

        setTitle('')

        dispatch(addCard({ columnId: props.columnId, card: newCard }))
        handleClose()
    }

    return (
        <li>
            <button className='w-full text-slate-400 p-3 rounded-xl flex items-center font-bold' onClick={handleShow}>
                <span className='me-2'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor"
                        className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </span>
                Add new card
            </button>

            <div
                className={"board_column_create_modal h-screen w-screen fixed top-0 left-0 z-20 flex pt-20 items-start justify-center " + (show ? '' : 'hidden')}
                onClick={(e) => handleModalClick(e)}
                ref={modalRef}
            >
                <div className="modal_dialog bg-slate-600 rounded-xl p-5 relative">
                    <button onClick={handleClose} className='absolute top-6 right-6 text-slate-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                    <div className="modal_header">
                        <div className="modal-header-title font-bold text-2xl text-white">
                            Create card
                        </div>
                    </div>
                    <div className="modal_body my-4">
                        <label htmlFor="board_column_create_title" className='text-white mb-2 font-semibold'>
                            Card title
                        </label>
                        <input id="board_column_create_title" className='bg-transparent block rounded-lg p-2 border-2 border-slate-500 text-white outline-none w-full'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="modal_footer">
                        <button type="button" onClick={handleSaveColumn} className='bg-sky-700 text-white py-2 px-4 rounded-lg font-semibold'>Save</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CreateCard