import React from 'react'
import logo from './logo.png'

function Logo() {
    return (
        <div className='logo'>
            <img
                src={logo}
                alt="logo"
                className="m-4 img-thumbnail shadow-lg p-4 mb-4 bg-dark" />
        </div>
    )
}

export default Logo
