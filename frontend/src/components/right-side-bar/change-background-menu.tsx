import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../../store/store"
import { useGetThemesQuery } from "../../store/services/board-theme-service"
import { CheckIcon } from "@heroicons/react/24/outline"
import { BoardTheme } from "../../types/board-type"
import { setBoard } from "../../store/slices/board-slice"
import { usePostChangeThemeMutation } from "../../store/services/board-service"



const ChangeBackgroundMenu = () => {
    const dispatch = useDispatch()
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const { data: themes, isLoading: isLoadingThemes } = useGetThemesQuery()
    const [changeBoardTheme] = usePostChangeThemeMutation()

    const selectTheme = async (theme: BoardTheme) => {
        if (!board) { return }
        dispatch(setBoard({
            ...board,
            theme_id: theme.id,
            theme: theme
        }))
        await changeBoardTheme({ board_id: board.id, theme_id: theme.id })
    }

    return (

        isLoadingThemes ? <div className="w-full">Loading</div> :
            <div className="w-full flex flex-col">
                <div className="flex flex-wrap gap-2 items-center mt-2 px-4">
                    {
                        themes?.map(theme => (
                            <button key={`theme-${theme.id}`}
                                style={{ backgroundColor: theme.bg_value }}
                                className="h-16 w-16 rounded flex flex-col items-center justify-center hover:border"
                                onClick={() => selectTheme(theme)}
                            >

                                {theme.id == board?.theme_id && <CheckIcon className="size-5" />}

                            </button>
                        ))
                    }
                </div>
            </div>


    )
}

export default ChangeBackgroundMenu