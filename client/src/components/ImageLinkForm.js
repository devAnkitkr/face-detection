import React from 'react'

function ImageLinkForm({ onInputChange, onButtonSubmit }) {
    return (
        <div className="imagelinkform">
            <input className="w-75" type="text" onChange={onInputChange} />
            <input
                type="submit"
                value="Detect"
                className="w-25 "
                onClick={onButtonSubmit} />
            </div>
    )
}

export default ImageLinkForm
