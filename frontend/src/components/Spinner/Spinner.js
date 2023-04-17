import React from 'react'

function Spinner({wrapped, minHeight=300}) {
    if (wrapped) {
        return (
            <div style={{'minHeight':`${minHeight}px`}}>
                <div className='my-spinner'></div>
            </div>
        )
    }
    return (
        <div className='my-spinner'></div>
    )
}

export default Spinner
