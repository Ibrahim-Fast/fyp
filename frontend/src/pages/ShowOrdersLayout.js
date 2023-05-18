import React, { useContext } from 'react'
import { UserState } from '../context/UserState'
import CustomerOrders from './Customer/CustomerOrders'
import TailorOrders from './Tailor/TailorOrders'
import AdminOrders from './Admin/AdminOrders'
import { Navigate } from 'react-router-dom'


const ProductsLayout = () => {
    const { user_state } = useContext(UserState)

    if (user_state === 'customer') {
        return (
            <CustomerOrders />
            )
        } else if (user_state === 'tailor') {
            return (
            <TailorOrders />
        )
    }
    else if (user_state === 'admin') {
        return (
            <AdminOrders />
        )
    } else {
        return (
            <Navigate to='/' replace />
        )
    }
}

export default ProductsLayout