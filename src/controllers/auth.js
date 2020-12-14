const express = require('express')
const bcrypt = require('bcrypt')
const { Account } = require('../models')

const router = express.Router()
const saltRounds = 10

router.post('/sign-in', async (req, res) => {
	return res.json('Signed in')
})

router.post('/sign-up', async (req, res) => {
	const email = 'pedro@pedro.com'
	const password = '123456'

	const hash = bcrypt.hashSync(password, saltRounds)

	const result = await Account.create({
		email,
		password: hash,
	})

	return res.json(result)
})

module.exports = router
