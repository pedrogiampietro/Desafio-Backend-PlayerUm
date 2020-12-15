const express = require('express')
const cors = require('cors')
const db = require('./models')
const authController = require('./controllers/auth')
const response = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')

const app = express()

app.use(cors())
app.use(response)
app.use(checkJwt)

// middlewares do próprio express;
app.use(express.json())
// utilizando o URLencoded você consegue pegar o body da req;
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authController)

app.get('/', (req, res) => {
	return res.send('Api running.')
})

db.sequelize.sync().then(() => {
	app.listen(3001, () => {
		console.log('Server listening on 3001!')
	})
})
