const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:fd0b2176-5481-4452-9424-f599f0bcee05',
  key:
    'e7b40fd3-1eb3-47a3-8dee-1868ad0eefc0:CK2Ijv4i8DgYWSvL+3mpu/h7jkkI8kyuTI3oAzbsZzo='
})


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  const payload = {name: username, id: uuid()}
  chatkit
    .createUser(payload)
    .then(() => res.status(201).json(payload))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.statusCode).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body
  res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }))
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
