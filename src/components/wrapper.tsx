import React from "react";
import { twMerge } from "tailwind-merge";

function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={twMerge("mx-5", className)}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );
}

export default Wrapper;