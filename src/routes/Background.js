import React from 'react'
import './Background.css'
import { ReactComponent as Logo } from './Bharat_Heavy_Electricals_Limited-Logo.wine.svg';

    const date = new Date();
    const showTime = date.getDate() + "/" + (date.getMonth()+1) +"/" + date.getFullYear() + " - "+ date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();



        const Background = () => {
            return (
           
        <body>
      
       <div class="footer">
        <div class="logo">
            <Logo/>

        </div>
        <div class="time">
{showTime}
        </div>
       </div>
     
    </body>
  
  )
}

export default Background

