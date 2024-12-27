import { twMerge } from "tailwind-merge";
import { ClockMode, switchMode } from "../../store/slices/clock-slices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

function ClockButton({ name, className, onClick }: {
    name: string,
    className?: string
    onClick: () => void
}) {
    return (
        <button
            className={twMerge("px-2 py-1 rounded-sm font-semibold text-gray-50 transition duration-300", className)}
            onClick={(e) => onClick()}
        >
            {name}
        </button>
    )
}
function ClockState() {
    const clockMode: ClockMode = useSelector((state: RootState) => state.clock.currentMode)
    const dispatch = useDispatch()
    const setClockMode = (mode: ClockMode) => {
        dispatch(switchMode(mode))
    }

    return (
        <div className="w-full flex gap-2 mt-4 justify-start sm:justify-between">
            <ClockButton name="Focus"
                className={clockMode == ClockMode.Focus ? "bg-gray-200 text-gray-950" : ""}
                onClick={() => setClockMode(ClockMode.Focus)}
            />
            <ClockButton name="Short Break"
                className={clockMode == ClockMode.ShortBreak ? "bg-gray-200 text-gray-950" : ""}
                onClick={() => setClockMode(ClockMode.ShortBreak)}
            />
            <ClockButton name="Long Break"
                className={clockMode == ClockMode.LongBreak ? "bg-gray-200 text-gray-950" : ""}
                onClick={() => setClockMode(ClockMode.LongBreak)}
            />
        </div>
    );
}

export default ClockState;