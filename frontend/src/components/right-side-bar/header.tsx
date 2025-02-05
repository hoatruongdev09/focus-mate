import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { Menu } from "./right-side-bar"
import ButtonXClose from "../commons/button-x-close"

interface Props {
    currentMenu: Menu
    onBackClick: () => void
    onHideClicked: () => void
}

const Header = (props: Props) => {
    const { currentMenu, onBackClick, onHideClicked } = props

    return (
        <div className="flex items-center justify-between px-2 relative pb-3">
            <button
                className="p-1 hover:bg-white hover:bg-opacity-25 rounded"
                onClick={onBackClick}
                disabled={currentMenu == Menu.MainMenu}
            >
                <ChevronLeftIcon className={`size-5 ${currentMenu == Menu.MainMenu ? "opacity-0" : "opacity-100"}`} />
            </button>
            <p className="text-center h-6 items-center font-semibold text-zinc-900">
                {currentMenu}
            </p>
            <ButtonXClose
                iconClassName="text-zinc-700"
                onClick={onHideClicked}
            />
            <div className="absolute bottom-0 right-0 left-0">
                <div className="w-full px-4">
                    <div className="h-px bg-zinc-300 mt-3" />
                </div>
            </div>
        </div>
    )
}
export default Header