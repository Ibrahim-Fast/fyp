import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
    const val = JSON.parse(localStorage.getItem(key))
    if (val) return val
    if (initialValue instanceof Function) return initialValue()
    return initialValue

}

export default function useLocalStorage(key, initialValue) {
    const [value, setvalue] = useState(() => {
        return getSavedValue(key, initialValue)
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])
    return [value, setvalue];
}