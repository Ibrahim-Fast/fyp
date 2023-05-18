import React, { useContext } from 'react'
import { UserState } from '../context/UserState'
import TailorServices from './Tailor/TailorServices'
import GeneralServices from './General/GeneralServices'


const ServicesLayout = () => {
  const { user_state } = useContext(UserState)

  if (user_state === 'tailor') {
    return (
      <TailorServices />
    )
  } else {
    return (
      <GeneralServices />
    )
  }
}

export default ServicesLayout