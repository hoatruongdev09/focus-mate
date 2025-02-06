
import { useEffect, useState } from "react"
import { Group, Task } from "../../../types/board-type"
import ArchivedCardsView from "./archived-card-view"
import ArchivedListsView from "./archived-list-view"
import { useGetArchivedItemsQuery } from "../../../store/services/board-service"
import { useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"

interface Props {
    isShow: boolean
}

enum MenuType {
    Cards = "cards",
    Lists = "lists"
}



const ArchivedItemsMenu = (props: Props) => {
    const { isShow } = props
    const [menuType, setMenuType] = useState<MenuType>(MenuType.Cards)
    const board = useSelector((state: AppRootState) => state.boardView.board)
    if (!board) { return <></> }


    const { data: items, isLoading, isError, error } = useGetArchivedItemsQuery({ board_id: board!.id, type: menuType })

    const handleChangeList = () => {
        switch (menuType) {
            case MenuType.Cards:
                setMenuType(MenuType.Lists)
                break
            case MenuType.Lists:
                setMenuType(MenuType.Cards)
                break
        }
    }

    return (
        <div className={`absolute inset-0 transition-all duration-100 ${isShow ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-96"} `}>
            <div className="w-full h-full flex flex-col px-4">
                <div className="flex gap-2 justify-between mt-2">
                    <input
                        className="flex-1 border px-1 py-2 rounded"
                        placeholder="Search archive..."
                    />
                    <button
                        onClick={handleChangeList}
                        className="bg-zinc-100 hover:bg-zinc-200 rounded px-2 text-sm font-semibold">
                        {
                            menuType == MenuType.Cards ? "Switch to lists" : "Switch to cards"
                        }
                    </button>
                </div>
                <div className="flex-1 relative">
                    {
                        isLoading && <></>
                    }
                    {
                        isError && <>{JSON.stringify(error)}</>
                    }

                    <ArchivedCardsView
                        isShow={menuType == MenuType.Cards}
                        tasks={items as Task[]}
                    />
                    <ArchivedListsView
                        isShow={menuType == MenuType.Lists}
                        groups={items as Group[]}
                    />
                </div>

            </div>
        </div>
    )

}

export default ArchivedItemsMenu