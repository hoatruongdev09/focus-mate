import { Link, useLocation } from "react-router-dom";
import Authentication from "./authentication/authentication";
import { useSelector } from "react-redux";
import { AppRootState } from "../store/store";
import React, { useEffect, useState } from "react";

const defaultBgStyle: React.CSSProperties = {
    background: "#fff"
}
function NavBar() {
    const location = useLocation()
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const [bgStyle, setBgStyle] = useState<React.CSSProperties | undefined>(defaultBgStyle)
    useEffect(() => {
        if (location) {
            console.log(`location: `, location.pathname)
            if (!location.pathname.includes("/board")) {
                setBgStyle(defaultBgStyle)
                return
            }
        }
        let style: React.CSSProperties | undefined = undefined

        if (board && board.theme) {
            style = {
                background: board.theme.fg_value
            }
        } else {
            style = defaultBgStyle
        }
        setBgStyle(style)
    }, [board, location])

    return (
        <div className="fixed left-0 right-0 top-0 h-10 flex flex-col justify-center items-center">
            <div
                style={bgStyle}
                className="w-full h-full flex justify-between items-center px-2 transition-all duration-300 border-b border-gray-300 border-opacity-50"
            >
                <Link to={'/'}>
                    <img src="/icon.png" className="w-8 h-8 rounded" />
                </Link>
                <div className="flex justify-center items-center gap-2">
                    <Authentication />
                </div>
            </div>
        </div>
    );
}

export default NavBar;