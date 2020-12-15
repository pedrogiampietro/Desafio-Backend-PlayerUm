const express = require('express')
const db = require('./models')
const cors = require('cors')
const authController = require('./controllers/auth')
const response = require('./middlewares/response')

const app = express()

app.use(response)
app.use(cors())
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
