const express = require('express')
const { Place } = require('../models')
const router = express.Router()

const { checkJwt } = require('../middlewares/jwt')

router.get('/listAll', async (req, res) => {
  const places = await Place.findAll()

  return res.jsonOK(places)
})

router.get('/', checkJwt, async (req, res) => {
  const { accountId } = req

  const places = await Place.findAll({ where: { accountId: accountId } })

  return res.jsonOK(places)
})

router.get('/:id', checkJwt, async (req, res) => {
  const { accountId } = req
  const { id } = req.params

  const place = await Place.findOne({ where: { id: id, accountId: accountId } })
  if (!place) return res.jsonNotFound()

  return res.jsonOK(place)
})

router.post('/', checkJwt, async (req, res) => {
  const { accountId, body } = req
  const { title, image, description } = body

  const addPlace = await Place.create({
    title,
    accountId,
    image,
    description,
  })

  return res.jsonOK(addPlace)
})

module.exports = router
