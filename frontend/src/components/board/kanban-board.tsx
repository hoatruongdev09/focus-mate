import BoardContent from "./board-content";
import ModalViewTask from "./modal-view-task";

function KanbanBoard() {

    return (
        <div className="pt-2 flex flex-col h-full w-full overflow-x-auto relative">
            <BoardContent />
            <ModalViewTask />
        </div>
    );




}

export default KanbanBoard;