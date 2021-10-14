const http = require('http')

module.exports = {
  fetchProperties: () =>
    new Promise((resolve, reject) => {
      http
        .get('http://localhost:8080/properties', (resp) => {
          let data = ''

          resp.on('data', (chunk) => {
            data += chunk
          })

          resp.on('end', () => {
            console.log(data)
            resolve(JSON.parse(data))
          })
        })
        .on('error', (err) => {
          console.error('Error: ' + err.message)
          reject(err)
        })
    }),
}
