import KanbanBoard from "../components/board/kanban-board"
import KanbanBoardTitle from "../components/board/kanban-board-title"
import SideBar from "../components/side-bar"


const KanbanBoardPage = () => {
    return (
        <>
            <div className="fixed left-0 right-0 top-12 bottom-0 flex items-stretch">
                <SideBar />
                <div className="flex flex-col flex-1">
                    <KanbanBoardTitle />
                    <div className="flex-1 relative">
                        <div className="absolute left-0 right-0 top-0 bottom-0">
                            <KanbanBoard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default KanbanBoardPage