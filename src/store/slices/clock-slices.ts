import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export enum ClockMode { Focus, ShortBreak, LongBreak }
export enum ClockStatus { Running, Pause, Stopped }

export interface ClockState {
    alarmTime: number
    currentMode: ClockMode
    currentStatus: ClockStatus
    focusTime: number
    shortBreakTime: number
    longBreakTime: number
    autoSwitchState: boolean
}

const initialState: ClockState = {
    alarmTime: 0,
    currentMode: ClockMode.Focus,
    currentStatus: ClockStatus.Stopped,
    shortBreakTime: 5000,
    longBreakTime: 300000,
    focusTime: 2700000,
    autoSwitchState: true
}

const executeStart = (state: ClockState) => {
    switch (state.currentMode) {
        case ClockMode.Focus:
            state.alarmTime = state.focusTime
            break
        case ClockMode.LongBreak:
            state.alarmTime = state.longBreakTime
            break
        case ClockMode.ShortBreak:
            state.alarmTime = state.shortBreakTime
            break

    }
    state.currentStatus = ClockStatus.Running
}

const executeSwitchMode = (state: ClockState, nextMode: ClockMode) => {
    state.currentMode = nextMode
    state.currentStatus = ClockStatus.Stopped;
    state.alarmTime = 0
}

export const clockSlice = createSlice({
    name: 'clock',
    initialState: initialState,
    reducers: {
        setSelectingTime: (state, action: PayloadAction<{ time: number, mode: ClockMode }>) => {
            const { time, mode } = action.payload
            switch (mode) {
                case ClockMode.Focus:
                    state.focusTime = time
                    break
                case ClockMode.ShortBreak:
                    state.shortBreakTime = time
                    break
                case ClockMode.LongBreak:
                    state.longBreakTime = time
                    break
            }
        },
        setClockState: (state, action: PayloadAction<ClockMode>) => {
            state.currentMode = action.payload
        },
        setStart: (state) => {
            executeStart(state)
        },
        setPauseOrContinue: (state) => {
            switch (state.currentStatus) {
                case ClockStatus.Pause:
                    state.currentStatus = ClockStatus.Running
                    break
                case ClockStatus.Running:
                    state.currentStatus = ClockStatus.Pause
                    break
            }
        },
        resetTimer: (state) => {
            state.alarmTime = 0
            state.currentStatus = ClockStatus.Stopped;
            console.log("reset")
        },
        switchMode: (state, action: PayloadAction<ClockMode>) => {
            executeSwitchMode(state, action.payload)
            console.log(state.currentMode)
        },
        countdown: (state, action: PayloadAction<number>) => {
            state.alarmTime = Math.max(state.alarmTime - action.payload, 0)
        },
        setAutoSwitchState: (state) => {
            state.autoSwitchState = !state.autoSwitchState
        },
        goToNextState: (state) => {
            console.log("go to next state")
            switch (state.currentMode) {
                case ClockMode.Focus:
                    executeSwitchMode(state, ClockMode.ShortBreak)
                    break
                case ClockMode.ShortBreak:
                    executeSwitchMode(state, ClockMode.LongBreak)
                    break;
                case ClockMode.LongBreak:
                    executeSwitchMode(state, ClockMode.Focus)
                    break;
            }
            executeStart(state)
        }

    }
})

export const {
    setSelectingTime,
    setClockState,
    setStart,
    setPauseOrContinue,
    resetTimer,
    switchMode,
    countdown,
    setAutoSwitchState,
    goToNextState
} = clockSlice.actions


export default clockSlice.reducer