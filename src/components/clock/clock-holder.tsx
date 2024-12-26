import { useEffect } from "react";
import Clock from "./clock";
import ClockState from "./clock-state";

export enum ClockStateType { Focus, ShortBreak, LongBreak }

function ClockHolder() {


    return (
        <div className="flex flex-col w-full lg:w-[40%]">
            <div className="bg-gray-600 rounded-md">
                <div className="m-2 p-3 bg-gray-700 rounded-md">
                    <Clock />
                    <ClockState />
                </div>
            </div>
        </div>
    );
}

export default ClockHolder;