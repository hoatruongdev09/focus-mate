
import { useCallback, useEffect, useMemo, useState } from "react"
import { List, Card } from "../../../types/board-type"
import ArchivedCardsView from "./archived-card-view"
import ArchivedListsView from "./archived-list-view"
import { useGetArchivedItemsQuery } from "../../../store/services/board-service"
import { useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"



enum MenuType {
    Cards = "cards",
    Lists = "lists"
}



const ArchivedItemsMenu = () => {
    const [menuType, setMenuType] = useState<MenuType>(MenuType.Cards)
    const board = useSelector((state: AppRootState) => state.boardView.board)

    const [searchValue, setSearchValue] = useState<string>("")

    if (!board) { return null }

    const { data: items, isLoading, isError, error } = useGetArchivedItemsQuery({
        board_id: board.id,
        type: menuType
    })

    const handleChangeList = () => {
        setMenuType((prev) => (prev === MenuType.Cards ? MenuType.Lists : MenuType.Cards))
    }

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }, [setSearchValue])

    const tasks = useMemo(() => {
        const casted = menuType === MenuType.Cards ? (items as Card[]) ?? [] : []
        if (searchValue === "") {
            return casted
        }
        return casted.filter(c => c.title.includes(searchValue))
    }, [menuType, items, searchValue])
    const groups = useMemo(() => {
        const casted = menuType === MenuType.Lists ? (items as List[]) ?? [] : []
        if (searchValue == "") {
            return casted
        }
        return casted.filter(c => c.name.includes(searchValue))
    }, [menuType, items, searchValue])

    return (
        <div className="w-full h-full flex flex-col px-4">
            <div className="flex gap-2 justify-between mt-2">
                <input
                    className="flex-1 border px-1 py-2 rounded"
                    placeholder="Search archive..."
                    value={searchValue}
                    onChange={handleSearch}
                />
                <button
                    onClick={handleChangeList}
                    className="bg-zinc-100 hover:bg-zinc-200 rounded px-2 text-sm font-semibold">
                    {
                        menuType == MenuType.Cards ? "Switch to lists" : "Switch to cards"
                    }
                </button>
            </div>
            <div className="h-px w-full bg-zinc-300 mt-2" />
            <div className="flex-1 relative">
                {
                    isLoading && <></>
                }
                {
                    isError && <>{JSON.stringify(error)}</>
                }

                <ArchivedCardsView
                    isShow={menuType == MenuType.Cards}
                    tasks={tasks}
                />
                <ArchivedListsView
                    isShow={menuType == MenuType.Lists}
                    groups={groups}
                />
            </div>

        </div>

    )

}

export default ArchivedItemsMenu