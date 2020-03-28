import React from 'react'

function Nav({ onRouteChange, isSignedIn }) {
    if (isSignedIn) {
        return (
            <nav
                className='signout'
                style={{
                    'width': '140px',
                    'position': 'fixed',
                    'right': '0',
                    'top': '0'
                }}>
                <button
                    onClick={() => onRouteChange('signin')}
                    className="btn btn-transparent text-warning border m-4">Sign out</button>
            </nav>
        )
    } else {
        return (
            <nav
                className='signout'
                style={{
                    'width': '140px',
                    'position': 'fixed',
                    'right': '0',
                    'top': '0'
                }}>
                <button
                    onClick={() => onRouteChange('register')}
                    className="btn btn-transparent text-warning border m-4">Register</button>
            </nav>
        )
    }
}

export default Nav
