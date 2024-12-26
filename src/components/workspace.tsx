
import ClockHolder from "./clock/clock-holder";
import TaskHolder from "./task/task-holder";

function Workspace() {
    return (
        <div className="bg-slate-900">
            <div className="min-h-screen mx-5">
                <div className="flex flex-row min-h-screen items-center justify-center max-w-7xl mx-auto relative">
                    <div className="absolute left-0 top-24 right-0 bottom-24 flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between">
                        <ClockHolder />
                        <TaskHolder />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workspace;