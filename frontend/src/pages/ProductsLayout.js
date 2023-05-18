import React, { useContext } from 'react'
import { UserState } from '../context/UserState'
import TailorProducts from './Tailor/TailorProducts'
import GeneralProducts from './General/GeneralProducts'


const ProductsLayout = () => {
  const { user_state } = useContext(UserState)

  if (user_state === 'tailor') {
    return (
      <TailorProducts />
    )
  } else {
    return (
      <GeneralProducts />
    )
  }
}

export default ProductsLayout