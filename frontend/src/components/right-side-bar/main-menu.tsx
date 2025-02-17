import { InformationCircleIcon, ListBulletIcon, ArchiveBoxXMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import { Menu } from "./right-side-bar"
import { useSelector } from "react-redux"
import { AppRootState } from "../../store/store"
import { CSSProperties } from "react"

interface Props {
    onOpenPage: (menu: Menu) => void
}

const MainMenu = (props: Props) => {
    const { onOpenPage } = props
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const userData = useSelector((state: AppRootState) => state.user.data)

    const bgStyle: CSSProperties = board && board.theme ? { background: board.theme.bg_value } : { background: "#fff" }

    const isAdmin = userData?.id == board?.owner?.id

    return (
        <>
            <div className="flex flex-col gap-2 mt-1 px-2">
                <div
                    className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer"
                    onClick={() => onOpenPage(Menu.AboutThisBoard)}
                >
                    <InformationCircleIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">About this board</p>
                        {isAdmin && <p className="text-sm">Add description to your board</p>}
                    </div>
                </div>

                <div
                    onClick={() => onOpenPage(Menu.Activity)}
                    className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    <ListBulletIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">Activity</p>
                    </div>
                </div>

                <div
                    onClick={() => onOpenPage(Menu.ArchivedItems)}
                    className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    <ArchiveBoxXMarkIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">Archived items</p>
                    </div>
                </div>

            </div>

            <div className="w-full px-4">
                <div className="h-px bg-zinc-300 mt-3" />
            </div>

            <div className="flex flex-col gap-2 mt-1 px-2">
                <div className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    <Cog6ToothIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">Settings</p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-3 py-2 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer"
                    onClick={() => onOpenPage(Menu.ChangeBackground)}
                >
                    <div
                        style={bgStyle}
                        className="border size-5 rounded"
                    />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">
                            Change background
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainMenu