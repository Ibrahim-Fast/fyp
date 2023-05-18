import React from 'react'

import { CgDanger } from 'react-icons/cg';
import { MdDangerous } from 'react-icons/md';


const NotFound = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 className='col-md-5' style={{ textAlign: "center" }}>
                <CgDanger className='mx-2' />ERROR
                </h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 className='col-md-5' style={{ textAlign: "center" }}>
                    <MdDangerous className='mx-2' /> NOT FOUND
                </h1>
            </div>
        </>
    )
}


export default NotFound