import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSewingString } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { UserState } from '../context/UserState'
import NavBarAdmin from './Admin/NavBarAdmin';
import NavBarCustomer from './Customer/NavBarCustomer';
import NavBarGeneral from './General/NavBarGeneral';
import NavBarTailor from './Tailor/NavBarTailor';


const NavBar = () => {
  const { user_state } = useContext(UserState)
  if (user_state === 'customer') {
    return (<NavBarCustomer />)
  } else if (user_state === 'tailor') {
    return (
      <NavBarTailor />
    )
  } else if (user_state === 'admin') {
    return (
      <NavBarAdmin />
    )
  } else return (
    <NavBarGeneral />
  )
}
export default NavBar