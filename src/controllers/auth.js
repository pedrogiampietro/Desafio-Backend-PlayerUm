const express = require('express')
const bcrypt = require('bcrypt')
const { Account } = require('../models')
const { accountSignIn, accountSignUp } = require('../validators/account')

const router = express.Router()
const saltRounds = 10

router.post('/sign-in', accountSignIn, async (req, res) => {
	return res.json('Signed in')
})

router.post('/sign-up', accountSignUp, async (req, res) => {
	const { body } = req
	const { email, password } = body

	const findAccount = await Account.findOne({ where: { email } })
	if (findAccount) return res.jsonBadRequest(null, 'Account already exists.')

	const hash = bcrypt.hashSync(password, saltRounds)

	const newAccount = await Account.create({
		email,
		password: hash,
	})

	return res.jsonOK(newAccount)
})

module.exports = router
