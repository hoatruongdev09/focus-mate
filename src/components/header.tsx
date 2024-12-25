import { useEffect, useState } from "react";
import Wrapper from "./wrapper";
import { twJoin } from "tailwind-merge";

function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const handleScroll = () => {
        const offset = window.scrollY;
        console.log(`scroll ${offset}`)
        setScrolled(offset > 50);
    }
    return (
        <header className={twJoin("fixed top-0 left-0 right-0 shadow-md transition duration-300", scrolled ? 'bg-slate-800' : '')}>
            <Wrapper>
                <div className="w-full h-16 flex justify-between items-center">
                    <div className="flex h-full items-end gap-1">
                        <div className="w-5 h-full bg-green-400"></div>
                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-gray-300 text-2xl">focus</h1>
                            <h1 className="font-bold text-gray-300 text-2xl">mate</h1>
                        </div>

                    </div>
                    <div className="flex items-center h-full gap-3">
                        <button className="px-5 py-2 rounded-md shadow-md border-slate-600 border-2 text-white font-bold bg-slate-500 ">Reports</button>
                        <button className="px-5 py-2 rounded-md shadow-md border-slate-600 border-2 text-white font-bold bg-slate-500 ">Settings</button>
                        <button className="px-5 py-2 rounded-md shadow-md border-slate-600 border-2 text-white font-bold bg-slate-500 ">Login</button>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
}

export default Header;
