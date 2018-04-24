const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')
const uuid = require('uuid/v4');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:f722c949-ddf2-4e88-908e-20ff810e0e21',
  key: 'aeffdb42-8e9c-4ebc-965e-fac92dd00600:0rPHwQsa3yeS9jO9aY6UYp/3Lu0t0IGf8+i+2FV6614=',
})

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
      console.log(error)
      if (error.error_type === 'services/chatkit/user/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.statusCode).json(error)
      }
    })
})

// app.post('/authenticate', (req, res) => {
//   console.log(req.body, req.query)
//   const { grant_type } = req.body
//   console.log(grant_type)
//   res.json(chatkit.authenticate({ grant_type }, req.query.user_id))
// })

app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body
  chatkit.getUsersByIds({ userIds: ['hey'] }).then(a => console.log(a))
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