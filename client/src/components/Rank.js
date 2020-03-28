import React from 'react'

const Rank=({name,entries})=>{
    return (
        <div className="rank text-center text-light">

            <h4><span>{name}</span>, your current entries are <span>{entries}</span> </h4>

            <p className="text-warning">Detect faces in your pictures, Give it a try.</p>
            
        </div>
    )
}

export default Rank
