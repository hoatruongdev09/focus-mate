
import ClockHolder from "./clock/clock-holder";
import TaskHolder from "./task/task-holder";
import Wrapper from "./wrapper";

function Workspace() {
    return (
        <div className="bg-slate-900">

            <Wrapper className="pt-36 min-h-screen pb-5">
                <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between">
                    <ClockHolder />
                    <TaskHolder />
                </div>
            </Wrapper>
        </div>
    );
}

export default Workspace;