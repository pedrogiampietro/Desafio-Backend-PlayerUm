const express = require('express')
const { Place } = require('../models')
const router = express.Router()

router.get('/', async (req, res) => {
  const { accountId } = req

  const places = await Place.findAll({ where: { id: accountId } })

  return res.jsonOK(places)
})

module.exports = router
