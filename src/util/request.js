const getBackend = (body,callback) => {
    fetch('/read',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
      })
      .then(res => res.json())
      .then(data => callback(data))
}

module.exports = {
    getBackend
}
