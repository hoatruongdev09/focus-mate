import ArchivedItemsMenu from "./archived-items-menu/archived-items-menu"
import BoardInfoMenu from "./board-info-menu"
import ChangeBackgroundMenu from "./change-background-menu"
import Header from "./header"
import MainMenu from "./main-menu"
import { useCallback, useState } from "react"

interface Props {
    isShow: boolean
    hide: () => void

}

export enum Menu {
    MainMenu = "Menu",
    AboutThisBoard = "About this board",
    Activity = "Activity",
    ArchivedItems = "Archived Items",
    Settings = "Settings",
    ChangeBackground = "Change background"
}

const RightSideBar = (props: Props) => {
    const { isShow, hide } = props

    const [currentMenu, setCurrentMenu] = useState<Menu>(Menu.MainMenu)

    const handleHide = useCallback(() => {
        hide()
        setCurrentMenu(Menu.MainMenu)
    }, [setCurrentMenu, hide])

    const handleBackClick = useCallback(() => {
        if (currentMenu == Menu.MainMenu) { return }
        setCurrentMenu(Menu.MainMenu)
    }, [currentMenu, setCurrentMenu])

    const handleOpenPage = useCallback((menu: Menu) => {
        setCurrentMenu(menu)
    }, [setCurrentMenu])

    return (
        <div className={`absolute ${isShow ? "translate-x-0" : "translate-x-96"}  top-0 right-0 bottom-0 w-96 bg-white py-2 flex flex-col z-10 shadow-lg border transition-transform duration-150`}>


            <Header
                currentMenu={currentMenu}
                onBackClick={handleBackClick}
                onHideClicked={handleHide}
            />
            <div className="flex-1 relative">
                <MainMenu
                    isShow={currentMenu == Menu.MainMenu}
                    onOpenPage={handleOpenPage}
                />
                <ChangeBackgroundMenu
                    isShow={currentMenu == Menu.ChangeBackground}
                />
                <BoardInfoMenu
                    isShow={currentMenu == Menu.AboutThisBoard}
                />
                <ArchivedItemsMenu
                    isShow={currentMenu == Menu.ArchivedItems}
                />
            </div>
        </div>
    )
}

export default RightSideBar