const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')
const uuid = require('uuid/v4');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:6061072e-71d1-492e-9989-20258f1fc9ca',
  key: 'd3e720d5-dd4d-4986-94eb-b8ff54fbb20b:i8BZYylam+e8VwsSFL1FW2ockdsSh1EKo3dyquWM63s=',
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