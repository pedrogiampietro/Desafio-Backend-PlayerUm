const express = require('express')
const cors = require('cors')
const db = require('./models')
const path = require('path')
const authController = require('./controllers/auth')
const placeController = require('./controllers/place')
const response = require('./middlewares/response')

const app = express()

app.use(cors())
app.use(response)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/auth', authController)
app.use('/place', placeController)

app.get('/', (req, res) => {
  return res.send('Api running.')
})

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server listening on 3001!')
  })
})
