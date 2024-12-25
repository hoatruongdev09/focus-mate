function Clock() {
    return (
        <div className="flex justify-between items-end">
            <div>
                <p className="font-extrabold text-gray-50 text-5xl">45:00</p>
            </div>
            <div className="h-full flex gap-2">
                <button className="font-semibold bg-gray-50 px-5 py-2 rounded-sm">RESET</button>
                <button className="font-semibold bg-gray-50 px-5 py-2 rounded-sm">START</button>
            </div>
        </div>
    );
}

export default Clock;