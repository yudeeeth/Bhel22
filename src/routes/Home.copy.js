import React from 'react'

const Home = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const getIsConnected = async () => {
      const response = await fetch('/isconnected');
      const data = await response.json();
      setIsConnected(data);
    };
    getIsConnected();
  })

  return (
    <div> Home 
        <div>
          Is connected? {isConnected.toString()}
        </div>
    </div>
  )
}

export default Home