
import ClockHolder from "./clock/clock-holder";
import TaskViewModal from "./task/update-task-view-modal";
import ColumnHolder from "./columns/column-holder";


function Workspace() {



    return (
        <>
            <div className="bg-slate-900">
                <div className="min-h-screen mx-5">
                    <div className="flex flex-row min-h-screen items-center justify-center max-w-7xl mx-auto relative">
                        <div className="absolute left-0 top-24 right-0 bottom-8 flex flex-col gap-3">
                            <ClockHolder />
                            <ColumnHolder />
                        </div>
                    </div>
                </div>
            </div>
            <TaskViewModal />
        </>
    );
}

export default Workspace;