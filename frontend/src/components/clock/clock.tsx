import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ClockMode, ClockStatus, countdown, goToNextState, resetTimer, setPauseOrContinue, setStart } from "../../store/slices/clock-slices";
import { useEffect, useState } from "react";


function Clock() {
    const { currentStatus, autoSwitchState, alarmTime, focusTime, longBreakTime, shortBreakTime, currentMode } = useSelector((state: RootState) => state.clock)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
    const dispatch = useDispatch()

    const clearTimer = () => {
        if (!timer) { return }
        clearInterval(timer)
        setTimer(null)
    }

    useEffect(() => {
        if (currentStatus != ClockStatus.Running) { return }

        if (alarmTime != 0) { return }

        if (autoSwitchState) {
            dispatch(goToNextState())
        } else {
            clearTimer()
            dispatch(resetTimer())
        }

    }, [alarmTime])

    useEffect(() => {
        switch (currentStatus) {
            case ClockStatus.Running:
                setTimer(setInterval(() => {
                    dispatch(countdown(10))

                }, 10))
                break
            default:
                clearTimer()
                break
        }
        return () => {
            clearTimer()
        }
    }, [currentStatus])

    const startPauseClock = (): void => {
        switch (currentStatus) {
            case ClockStatus.Stopped:
                dispatch(setStart())
                break
            case ClockStatus.Pause:
            case ClockStatus.Running:
                dispatch(setPauseOrContinue())
                break;
        }
    }

    const formatTime = (time: number) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor(time / 60000);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const getClockTime = () => {
        if (currentStatus == ClockStatus.Stopped) {
            switch (currentMode) {
                case ClockMode.Focus:
                    return focusTime
                case ClockMode.LongBreak:
                    return longBreakTime
                case ClockMode.ShortBreak:
                    return shortBreakTime
            }
        }
        return alarmTime
    }

    return (
        <div className="flex justify-between items-end">
            <div>
                <p className="font-extrabold text-gray-50 text-5xl">
                    {formatTime(getClockTime())}
                </p>
            </div>
            <div className="h-full flex gap-2">
                <button
                    className="font-semibold bg-gray-50 px-5 py-2 rounded-sm"
                    onClick={e => startPauseClock()}
                >
                    {currentStatus == ClockStatus.Running ? "PAUSE" : "START"}
                </button>
            </div>
        </div>
    );
}

export default Clock;