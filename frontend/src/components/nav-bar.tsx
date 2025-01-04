function NavBar() {

    return (
        <div className="fixed left-2 right-2 top-2 h-16 flex flex-col justify-center items-center">
            <div className="bg-white w-full h-full rounded flex justify-between items-center px-2">
                <div className="flex gap-2 justify-center items-center">
                    <div className="h-12 w-12 bg-orange-500">

                    </div>
                    <p>Focus mate</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <button>Sign in</button>
                    <div className="h-12 w-12 bg-orange-500">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;