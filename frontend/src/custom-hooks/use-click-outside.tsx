import React, { MutableRefObject, useCallback, useEffect, useRef } from "react"

function useClickOutside(callback: () => void, ignoreRefs: Array<MutableRefObject<any>>, dependencies: React.DependencyList) {
    const ref = useRef<HTMLDivElement | null>(null)

    const onClickOutside = useCallback((e: MouseEvent) => {
        if (!ref || !ref.current) { return }
        for (let i of ignoreRefs) {
            console.log(ignoreRefs)
            if (!i || !i.current) { continue }
            if (ref.current.contains(i.current.target as Node)) {
                return;
            }
        }
        if (!ref.current.contains(e.target as Node)) {
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