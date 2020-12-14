const express = require('express')

const router = express.Router()

router.post('/sign-in', async (req, res) => {
	return res.json('Signed in')
})

router.post('/sign-up', async (req, res) => {
	return res.json('Signed up')
})

module.exports = router
