import { useCallback } from "react"
import { List } from "../../../types/board.type"
import ArchivedList from "./archived-list"
import { useArchiveOrUnarchiveListMutation, useDeleteListMutation } from "../../../store/services/board-service"
import { useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"

interface Props {
    isShow: boolean
    groups: List[]
}

const ArchivedListsView = (props: Props) => {
    const { isShow, groups } = props
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const [archiveColumn] = useArchiveOrUnarchiveListMutation()
    const [deleteColumn] = useDeleteListMutation()

    const handleDeleteGroup = useCallback((group: List) => {
        if (!board) { return }
        deleteColumn({ board_id: board.id, column_id: group.id })
    }, [deleteColumn, board])

    const handleRestoreGroup = useCallback((group: List) => {
        if (!board) { return }
        archiveColumn({ board_id: board.id, column_id: group.id })
    }, [archiveColumn, board])

    return (
        <div
            className={`absolute inset-0 overflow-y-scroll flex flex-col items-center mt-2 gap-2 ${isShow ? 'opacity-100 z-10' : 'opacity-0 z-0'} transition-opacity duration-100`}
        >
            {
                groups.map(g => (
                    <ArchivedList
                        key={`archived-group-${g.id}`}
                        group={g}
                        onDelete={handleDeleteGroup}
                        onRestore={handleRestoreGroup}
                    />
                ))
            }

        </div>
    )
}

export default ArchivedListsView