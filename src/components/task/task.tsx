function Task() {
    return (
        <div className="bg-gray-700 h-16 rounded-md flex justify-between items-center px-5">
            <div className="flex gap-5">
                <input type="checkbox" className="h-7 w-7 rounded-full" />
                <p className="font-bold text-xl text-gray-200">Traffic light</p>
                <p className="bg-red-500 px-3 py-1 rounded-full font-bold text-gray-200">High</p>
            </div>
            <div className="flex gap-2 items-center">
                <p className="bg-green-500 px-3 py-1 font-bold text-gray-200">1h</p>
                <button className="bg-red-500 px-5 py-1 font-bold text-gray-200">Delete</button>
            </div>
        </div>
    );
}

export default Task;