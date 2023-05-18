import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh"
            }}>
                <h1>
                    <Spinner animation="grow" style={{ "fontSize": "40vw" }} />
                    <Spinner animation="grow" style={{ "fontSize": "40vw" }} />
                    <Spinner animation="grow" style={{ "fontSize": "40vw" }} />
                    NOW LOADING
                    <Spinner animation="grow" style={{ "fontSize": "40vw" }} />
                    <Spinner animation="grow" style={{ "fontSize": "40vw" }} />
                    <Spinner animation="grow" style={{ "fontSize": "40vw" }} />
                </h1>
            </div>
        </>
    )
}

export default Loading

