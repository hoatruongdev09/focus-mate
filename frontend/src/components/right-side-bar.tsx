
import { InformationCircleIcon, ListBulletIcon, ArchiveBoxXMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"
import ButtonXClose from "./commons/button-x-close"

const RightSideBar = () => {

    const handleCloseClick = () => { }
    return (
        <div className={`absolute top-0 right-0 bottom-0 w-72 bg-white py-2 flex flex-col z-10 shadow-lg border`}>
            <ButtonXClose
                buttonClassName="absolute right-2"
                iconClassName="text-zinc-700"
                onClick={handleCloseClick}
            />
            <p className="text-center mt-1 h-6 items-center font-semibold text-zinc-900">Menu</p>
            <div className="w-full px-4">
                <div className="h-px bg-zinc-300 mt-3" />
            </div>

            <div className="flex flex-col gap-2 mt-1 px-2">
                <div className="flex items-center gap-3 py-1 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    <InformationCircleIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">About this board</p>
                        <p className="text-sm">Add description to your board</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 py-1 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    <ListBulletIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">Activity</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 py-1 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
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
                <div className="flex items-center gap-3 py-1 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    <Cog6ToothIcon className="size-5 text-zinc-700" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">Settings</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 py-1 px-2 rounded hover:bg-zinc-200 hover:cursor-pointer">
                    {/* <ListBulletIcon className="size-5 text-zinc-700" /> */}
                    <div className="border size-5 rounded bg-white" />
                    <div className="flex flex-col text-zinc-900">
                        <p className="text-sm font-semibold">Change background</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RightSideBar