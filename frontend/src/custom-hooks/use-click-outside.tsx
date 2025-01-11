import React, { useCallback, useEffect, useRef } from "react"

function useClickOutside(callback: () => void, dependencies: React.DependencyList) {
    const ref = useRef<HTMLDivElement | null>(null)

    const onClickOutside = useCallback((e: MouseEvent) => {
        if (ref && ref.current && !ref.current.contains(e.target as Node)) {
            callback()
        }
    }, [ref, ...dependencies])

    useEffect(() => {
        document.addEventListener('mouseup', onClickOutside)

        return () => {
            document.removeEventListener('mouseup', onClickOutside)
        }
    }, [onClickOutside])
    return ref
}
export default useClickOutside