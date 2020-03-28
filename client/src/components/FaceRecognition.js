import React from 'react'

function FaceRecognition({ imageUrl, box }) {
    return (
        <div className="facerecognition mx-auto text-center">
            <img id="image" src={imageUrl} alt="" width='500px' height='auto'></img>
            <div style={{
                padding:0,
                margin:0,
                position: 'absolute',
                borderRadius: '5px',
                borderColor:'red',
                borderStyle:'solid',
                width: box.w,
                height: box.h,
                top: box.t,
                left: box.l
            }}>
            </div>
        </div>
    )
}

export default FaceRecognition
