import { Link, useLocation } from "react-router-dom";
import Authentication from "./authentication/authentication";
import { useSelector } from "react-redux";
import { AppRootState } from "../store/store";
import React, { useEffect, useState } from "react";

const defaultStyle: React.CSSProperties = {
    background: "#fff"
}
function NavBar() {
    const location = useLocation()
    const board = useSelector((state: AppRootState) => state.boardView.board)

    const [bgStyle, setBgStyle] = useState<React.CSSProperties | undefined>(defaultStyle)
    const [fgStyle, setFgStyle] = useState<React.CSSProperties | undefined>(defaultStyle)

    useEffect(() => {
        if (location) {
            if (!location.pathname.startsWith("/workspace/board")) {
                setBgStyle(defaultStyle)
                setFgStyle(defaultStyle);
                console.log(`location: `, location.pathname)
                return
            }
        }
        applyBgStyle()
        applyFgStyle()
    }, [board, location])

    return (
        <div
            style={bgStyle}
            className="fixed left-0 right-0 top-0 h-10 flex flex-col justify-center items-center">
            <div
                style={fgStyle}
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

    function applyBgStyle() {
        let style: React.CSSProperties | undefined = undefined;
        if (board && board.theme) {
            style = {
                background: board.theme.bg_value
            };
        } else {
            style = defaultStyle;
        }
        setBgStyle(style);
    }

    function applyFgStyle() {
        let style: React.CSSProperties | undefined = undefined;
        if (board && board.theme) {
            style = {
                background: board.theme.fg_value
            };
        } else {
            style = defaultStyle;
        }
        setFgStyle(style);
    }

}

export default NavBar;