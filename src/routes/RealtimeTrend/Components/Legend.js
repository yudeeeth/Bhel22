import React from 'react'

const Legend = (props) => {
  const list = ()=>{
    let ret = [];
    for(let i=0;i<5;i++){
      let currindex = props.offset*5+props.currentChannels*10+i;
      ret.push(li(`Channel No: ${currindex+1}`,props.currentValues[currindex],props.colors[props.offset*5+i]));
    }
    return ret;
  }

  const li = (name,value,color)=>{
    return (
      <div key={name} className='legend-element'> 
        <div className='legend-element-name'>
          {name}
        </div>
        <div className='legend-element-value' style={{color:`${color}`}}> {value} </div>
      </div>
    )
  }

  return (
    <div className='legend-container'>
        <div className='legend-title'>Legend Db</div>
        {list()}
    </div>
  )
}

export default Legend