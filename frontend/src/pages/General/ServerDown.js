import React from 'react'

import { FaHeartBroken } from 'react-icons/fa';


const ServerDown = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 className='col-md-5' style={{ textAlign: "center" }}>
                    ERROR
                </h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 className='col-md-5' style={{ textAlign: "center" }}>
                    <FaHeartBroken className='mx-2' /> Server is Down
                </h1>
            </div>
        </>
    )
}

export default ServerDown