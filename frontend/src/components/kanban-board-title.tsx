import SearchIcon from "../Icon/search-icon";

function KanbanBoardTitle() {
    return (
        <div className="w-full flex h-16 bg-white rounded justify-between px-2 py-2">
            <div className="flex gap-2 justify-center items-center">
                <div className="h-10 w-10 bg-orange-300"></div>
                <p className="align-middle font-bold text-2xl">Board name</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <input className="bg-gray-100 py-2 rounded px-2" placeholder="Type to search..."></input>
                <button className="px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}

export default KanbanBoardTitle;