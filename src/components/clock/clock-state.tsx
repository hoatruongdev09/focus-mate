import { twMerge } from "tailwind-merge";

function ClockButton({ name, className }: { name: string, className?: string }) {
    return (
        <button className={twMerge("px-2 py-1 rounded-sm font-semibold text-gray-50", className)}>{name}</button>
    )
}
function ClockState() {
    return (
        <div className="w-full flex gap-2 mt-4">
            <ClockButton name="Focus" className="bg-gray-200 text-gray-950" />
            <ClockButton name="Short Break" />
            <ClockButton name="Long Break" />
        </div>
    );
}

export default ClockState;