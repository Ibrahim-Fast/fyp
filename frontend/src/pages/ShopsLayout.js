import React, { useContext } from 'react'
import { UserState } from '../context/UserState'
import GeneralShops from './General/GeneralShops'
import TailorShops from './Tailor/TailorShops'
import CustomerShops from './Customer/CustomerShops'
import AdminShops from './Admin/AdminShops'

const ShopsLayout = () => {
    const { user_state } = useContext(UserState)
    if (user_state === 'customer') {
        return (<GeneralShops />)
    } else if (user_state === 'tailor') {
        return (
            <TailorShops />
        )
    } else if (user_state === 'admin') {
        return (
            <AdminShops />
        )
    } else {
        return (<GeneralShops />)
    }
}

export default ShopsLayout