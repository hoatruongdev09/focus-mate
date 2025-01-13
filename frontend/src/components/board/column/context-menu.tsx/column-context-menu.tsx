import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useCallback, useRef, useState } from "react";
import useClickOutside from "../../../../custom-hooks/use-click-outside";
import MainMenuList from "./main-menu";
import ConfirmArchiveCardsMenu from "./confirm-archive-cards.menu";

interface Props {
    setShowCreateTask: () => void
    archiveList: () => void
    archiveTasksInList: () => void
}

enum MenuType {
    MAIN_MENU = "main",
    ARCHIVE_ALL_CARDS = "archive_all_card"
}

function ColumnContextMenu(props: Props) {
    const { setShowCreateTask, archiveList, archiveTasksInList } = props
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [menuType, setMenuType] = useState<MenuType>(MenuType.MAIN_MENU)

    const ref = useRef<HTMLDivElement>(null)

    const handleShowContext = useCallback(() => {
        setShowContextMenu(!showContextMenu)
        setMenuType(MenuType.MAIN_MENU)
    }, [showContextMenu, setShowContextMenu, setMenuType])

    const clickOutsideRef = useClickOutside(() => {
        setShowContextMenu(false)
        setMenuType(MenuType.MAIN_MENU)
    }, [], [showContextMenu, setShowContextMenu, setMenuType])

    const handleShowCreateTask = useCallback(() => {
        setShowCreateTask()
        setShowContextMenu(false)
        setMenuType(MenuType.MAIN_MENU)
    }, [setShowCreateTask, setShowContextMenu, setMenuType])

    const handleArchiveList = useCallback(() => {
        archiveList()
        setShowContextMenu(false)
        setMenuType(MenuType.MAIN_MENU)
    }, [archiveList, setShowContextMenu, setMenuType])

    const handleArchiveTasksInList = useCallback(() => {
        archiveTasksInList()
        setShowContextMenu(false)
        setMenuType(MenuType.MAIN_MENU)
    }, [archiveTasksInList, setShowContextMenu, setMenuType])


    const handleHideArchiveCardMenu = useCallback(() => {
        setMenuType(MenuType.MAIN_MENU)
    }, [menuType, setMenuType])

    const handleShowArchiveCardMenu = useCallback(() => {
        setMenuType(MenuType.ARCHIVE_ALL_CARDS)
    }, [menuType, setMenuType])


    const ConditionShowMenu = ({ menuType }: { menuType: MenuType }) => {
        switch (menuType) {
            case MenuType.MAIN_MENU:
                return (
                    <MainMenuList
                        handleArchiveList={handleArchiveList}
                        handleArchiveTasksInList={handleShowArchiveCardMenu}
                        handleShowCreateTask={handleShowCreateTask}
                        handleShowContext={handleShowContext}
                    />
                )
            case MenuType.ARCHIVE_ALL_CARDS:
                return (
                    <ConfirmArchiveCardsMenu
                        handleGoBack={handleHideArchiveCardMenu}
                        handleShowContext={handleShowContext}
                        handleArchiveCards={handleArchiveTasksInList}
                    />
                )
            default:
                return (<></>)
        }
    }

    return (
        <div className="relative" ref={clickOutsideRef}>
            <button
                className={`p-1 rounded ${showContextMenu ? "bg-gray-600 text-white hover:bg-gray-500" : "hover:bg-gray-200"}`}
                onClick={handleShowContext}
            >
                <EllipsisHorizontalIcon className="size-4" />
            </button>
            <div
                ref={ref}
                className="absolute z-10 left-0"
            >
                {
                    showContextMenu &&
                    <div className="flex flex-col w-64 bg-white shadow-lg border rounded-xl pb-3">
                        <ConditionShowMenu menuType={menuType} />
                    </div>
                }
            </div>
        </div>
    );
}

export default ColumnContextMenu;