import React, { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStrorage'

export const UserState = createContext()
const Context = ({ children }) => {

    const [user_state, set_user_state] = useLocalStorage("type", "general")
    const [at, set_at] = useLocalStorage("at", '')
    const [refresh_count, set_refresh_count] = useLocalStorage("rc", 0)
    const [rt, set_rt] = useLocalStorage("rt", '')
    const [cart, set_cart] = useLocalStorage("cart", '-1')
    const [extras, set_extras] = useLocalStorage("extras", '-1')

    return (<UserState.Provider value={{ user_state, set_user_state, at, set_at, rt, set_rt, refresh_count, set_refresh_count, cart, set_cart, extras, set_extras }}>
        {children}
    </UserState.Provider>
    )
}



export default Context