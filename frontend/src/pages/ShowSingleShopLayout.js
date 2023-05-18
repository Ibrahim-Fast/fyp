import React, { useContext } from 'react'
import { UserState } from '../context/UserState'
import ShopPageTailor from './Tailor/ShopPageTailor'
import ShopPageCustomer from './Customer/ShopPageCustomer'
import ShopPageAdmin from './Admin/ShopPageAdmin'
import ShopPageGeneral from './General/ShopPageGeneral'

const ShowShop = () => {
    const { user_state } = useContext(UserState)

    if (user_state === 'tailor') {

        return (
            <ShopPageTailor />
        )
    }
    else if (user_state === 'customer') {

        return (
            <ShopPageGeneral />
        )
    } else if (user_state === 'admin') {

        return (
            <ShopPageAdmin />
        )
    } else {
        return (
            <ShopPageGeneral />
        )
    }

}

export default ShowShop