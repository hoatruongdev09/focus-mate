
import { useState } from "react";
import ClockHolder from "./clock/clock-holder";
import TaskHolder from "./task/task-holder";
import TaskViewModal from "./task/task-view-modal";
import TaskCreatingModal from "./task/task-creating-modal";

interface OpenModalProps {
    isOpen: boolean
    category: string
}

function Workspace() {
    const [createTaskModalData, setCreateTaskModalData] = useState<OpenModalProps>({ isOpen: false, category: "" })

    const onOpenCreateTask = (category: string): void => {
        setCreateTaskModalData({
            isOpen: true,
            category
        })
    }

    return (
        <>
            <div className="bg-slate-900">
                <div className="min-h-screen mx-5">
                    <div className="flex flex-row min-h-screen items-center justify-center max-w-7xl mx-auto relative">
                        <div className="absolute left-0 top-24 right-0 bottom-5 flex flex-col gap-3">
                            <ClockHolder />
                            <div className="flex flex-row gap-2 overflow-x-scroll flex-1 no-scrollbar">
                                <TaskHolder category="todo" openCreateTask={onOpenCreateTask} />
                                <TaskHolder category="doing" openCreateTask={onOpenCreateTask} />
                                <TaskHolder category="done" openCreateTask={onOpenCreateTask} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TaskCreatingModal
                category={createTaskModalData.category}
                isOpen={createTaskModalData.isOpen}
                setIsOpen={(isOpen: boolean) => setCreateTaskModalData({ ...createTaskModalData, isOpen })}
            />
            <TaskViewModal />
        </>
    );
}

export default Workspace;