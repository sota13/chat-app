import React from 'react'

function ContentSample({handleClose}) {
  return (
    <div className='modal-content-sample'>
    <div className="modal-header">
        <h5 className="modal-title">Modal Title</h5>
    </div>
    <div className="modal-content">
        Praesent commodo cursus magna, vel scelerisque nisl consectetur
        et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
        dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur
        et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
        fringilla.
    </div>
    <div className="modal-footer">
        <button
            className="modal-button"
            onClick={handleClose}
        >
            Close
        </button>
    </div>
    </div>
  )
}

export default ContentSample