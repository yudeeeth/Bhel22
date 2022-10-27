import React from 'react'

const ChangeChannel = (props) => {
    return (
        <div className='realtime-title-container' >
            <div className='realtime-title'>RealTime Trend Channel {1+props.currentChannels*10} to { 10+props.currentChannels*10} </div>
            <button className='btn-metal change-channel-btn' 
            onClick={_=>props.setCurrentChannels(e=>{
                if(e>2) return 0;
                return e+1;
            })}> Change Channels </button>
        </div>
    )
}

export default ChangeChannel