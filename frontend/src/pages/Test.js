import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import axios from '../api/axios'
import { UserState } from '../context/UserState'

const Test = () => {
    const { cart, set_cart } = useContext(UserState)

    return (
        <>
            <Button variant="primary" onClick={() => set_cart(p => [1, ...p])}>Add</Button>{' '}
            <Button variant="primary" onClick={() => set_cart([])}>remove</Button>{' '}
        </>
    )
}

export default Test