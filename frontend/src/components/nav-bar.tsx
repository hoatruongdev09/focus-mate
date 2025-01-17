import Authentication from "./authentication/authentication";

function NavBar() {

    return (
        <div className="fixed left-0 right-0 bottom-0 h-12 flex flex-col justify-center items-center">
            <div className="bg-white w-full h-full rounded flex justify-between items-center px-2">
                {/* <div className="flex gap-2 justify-center items-center">
                    <div className="h-8 w-8">
                        <img className="rounded" src="icon.png" />
                    </div>
                    <p>Focus mate</p>
                </div> */}
                <div></div>
                <div className="flex justify-center items-center gap-2">
                    <Authentication />
                </div>
            </div>
        </div>
    );
}

export default NavBar;