import React, { useContext } from 'react'
import { UserState } from '../context/UserState'
import AdminHome from './Admin/AdminHome'
import CustomerHome from './Customer/CustomerHome'
import GeneralHome from './General/GeneralHome'
import TailorHome from './Tailor/TailorHome'
import Stack from 'react-bootstrap/Stack';


const Home = () => {


  const { user_state } = useContext(UserState)
  if (user_state === 'customer') {
    return (
      <CustomerHome />
    )
  } else if (user_state === 'tailor') {
    return (
      <TailorHome />
    )
  } else if (user_state === 'admin') {
    return (
      <AdminHome />
    )
  } else {
    return (<GeneralHome />)
  }
}

export default Home