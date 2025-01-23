import { Link } from "react-router-dom";
import Authentication from "./authentication/authentication";

function NavBar() {

    return (
        <div className="fixed left-0 right-0 top-0 h-12 flex flex-col justify-center items-center">
            <div className="bg-white w-full h-full rounded flex justify-between items-center px-2">
                <Link to={'/'}>
                    <img src="/icon.png" className="w-11 h-11 rounded" />
                </Link>
                <div className="flex justify-center items-center gap-2">
                    <Authentication />
                </div>
            </div>
        </div>
    );
}

export default NavBar;