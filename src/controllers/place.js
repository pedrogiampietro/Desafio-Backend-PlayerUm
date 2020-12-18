const express = require('express')
const { Place } = require('../models')
const router = express.Router()

router.get('/', async (req, res) => {
  const { accountId } = req

  const places = await Place.findAll({ where: { id: accountId } })

  return res.jsonOK(places)
})

router.get('/:id', async (req, res) => {
  const { accountId } = req
  const { id } = req.params

  const place = await Place.findOne({ where: { id: id, id: accountId } })
  if (!place) return res.jsonNotFound()

  return res.jsonOK(place)
})

router.post('/', async (req, res) => {
  const { accountId, body } = req
  const { title, image, description } = body

  const addPlace = await Place.create({
    title,
    accountId,
    image,
    description,
  })

  console.log(addPlace)

  // return res.jsonOK(place)
})

module.exports = router
