import { XMarkIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useCallback, useState } from "react"
import { useCreateBoardMutation } from "../../store/services/board-service"

interface Props {
    onCloseClick: () => void
}

interface BoardState {
    title: string
    description: string
    bgColor: string
}

const CreateNewBoard = (props: Props) => {
    const { onCloseClick } = props

    const [createBoard] = useCreateBoardMutation()

    const [boardState, setBoardState] = useState<BoardState>({
        title: '',
        description: '',
        bgColor: ''
    })

    const handleCreateBoard = useCallback(async () => {
        try {
            await createBoard(boardState)
            setBoardState({
                title: "",
                description: "",
                bgColor: ""
            })
            onCloseClick()
        } catch (err) {
            console.error(err)
        }
    }, [onCloseClick, boardState, setBoardState, createBoard])

    const changeBoardState = useCallback((name: string, value: string) => {
        setBoardState({
            ...boardState,
            [name]: value
        })
    }, [boardState, setBoardState])

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeBoardState(e.target.name, e.target.value);
    }, [changeBoardState])

    const handleTextAreaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        changeBoardState(e.target.name, e.target.value);
    }, [changeBoardState])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">

            <div className="mx-auto my-auto bg-white rounded-md p-3 flex flex-col">
                <div className="relative">
                    <p className="text-center text-lg font-bold">Create board</p>
                    <button
                        onClick={onCloseClick}
                        className="absolute right-0 top-0 rounded p-1 hover:bg-zinc-300">
                        <XMarkIcon className="size-5" />
                    </button>
                </div>
                <div className="flex gap-3">
                    <div className="flex flex-col w-48">
                        <p className="text-sm font-semibold">Appearance: </p>
                        <div className="flex items-center justify-center">
                            <div className="w-48 h-32 bg-pink-400 rounded flex justify-center items-center">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-16 bg-slate-100 rounded-sm">

                                    </div>
                                    <div className="w-10 h-12 bg-slate-100 rounded-sm">

                                    </div>
                                    <div className="w-10 h-20 bg-slate-100 rounded-sm">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm font-semibold pt-2">Background:</p>
                        <div className="flex gap-1 flex-wrap">
                            <button className="w-7 h-7 bg-pink-400 rounded"></button>
                            <button className="w-7 h-7 bg-pink-400 rounded"></button>
                            <button className="w-7 h-7 bg-pink-400 rounded"></button>
                            <button className="w-7 h-7 bg-pink-400 rounded"></button>
                            <button className="w-7 h-7 bg-pink-400 rounded"></button>
                            <button className="w-7 h-7 bg-pink-400 rounded"></button>
                        </div>
                    </div>


                    <div className="flex flex-col w-48">
                        <p className="text-sm font-semibold">Board title:</p>
                        <input
                            name="title"
                            className="bg-zinc-100 rounded-sm px-2 py-1 outline-none text-sm"
                            placeholder="Enter a title"
                            onChange={handleInputChange}
                        />
                        <p className="text-sm font-semibold pt-2">Description:</p>
                        <textarea
                            name="description"
                            className="bg-zinc-100 rounded-sm px-2 py-1 outline-none text-sm flex-1 resize-none"
                            placeholder="Enter a description"
                            onChange={handleTextAreaChange}
                        />
                        <button
                            onClick={handleCreateBoard}
                            className="bg-pink-400 rounded-sm hover:bg-pink-500 text-sm font-bold text-white py-1 mt-2"
                        >
                            Create
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateNewBoard