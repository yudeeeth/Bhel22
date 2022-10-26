import React from 'react'
import './Home.css'
import { ReactComponent as Logo } from './bar-chart-svgrepo-com.svg'



const Home = () => {
  return (

    <body>
  
 
   
    <div class="flex-container-1">
  <div>
  <button class="bar-graph btn" >
 {/* <Logo /> */}
   Hello World
    </button>
   
  </div>
  <div>
  <button class="freq-spec btn" >
   Hello World
    </button>

    {/* <IconButton icon={<BarChart />} color="green" 
                appearance="primary" class="freq-spec" /> */}
  </div>
  <div>
  <button class="trends btn" >
   Hello World
    </button>
  </div>
</div>

<div class="flex-container-2">
  <div>
   <button class="mimic btn" >
   Hello World
    </button>
  </div>
  <div >
  <button class="sonic" >
   Bhelsonic
    </button>
  </div>
  <div>
  <button class="sens-prof btn" >
   Hello World
    </button>
  </div>
</div>

<div class="flex-container-3">
  <div>
   <button class="settings btn" >
   Hello World
    </button>
  </div>
  <div>
  <button class="status btn" >
   Hello World
    </button>
  </div>
  <div>
  <button class="help btn" >
   Hello World
    </button>
  </div>
</div>
</body>
)
}
export default Home