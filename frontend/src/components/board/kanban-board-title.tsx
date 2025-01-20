import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function KanbanBoardTitle() {
    return (
        <div className="w-full border border-l-0 flex h-12 bg-white justify-between px-2">
            <div className="flex gap-2 justify-center items-center">
                <div className="h-10 w-10 bg-orange-300"></div>
                <p className="align-middle font-bold text-xl">Board name</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <input className="bg-gray-100 py-2 rounded px-2" placeholder="Type to search..."></input>
                <button className="px-2 py-2 rounded cursor-pointer hover:bg-gray-100">
                    <MagnifyingGlassIcon className="size-6" />
                </button>
            </div>
        </div>
    );
}

export default KanbanBoardTitle;