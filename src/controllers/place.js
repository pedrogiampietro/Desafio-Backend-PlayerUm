const express = require('express')
const { Place } = require('../models')

const { checkJwt } = require('../middlewares/jwt')
const { uploadPlacesPicture } = require('../middlewares/multer')

const router = express.Router()

router.get('/', checkJwt, async (req, res) => {
  const { accountId } = req

  console.log(req)

  const places = await Place.findAll({ where: { accountId: accountId } })

  return res.jsonOK(places)
})

router.get('/listAll', async (req, res) => {
  const places = await Place.findAll()

  return res.jsonOK(places)
})

router.get('/:id', checkJwt, async (req, res) => {
  const { accountId } = req
  const { id } = req.params

  const place = await Place.findOne({ where: { id: id, accountId: accountId } })
  if (!place) return res.jsonNotFound()

  return res.jsonOK(place)
})

router.post(
  '/',
  checkJwt,
  uploadPlacesPicture.single('image'),
  async (req, res) => {
    const { accountId, body } = req
    const { title, description } = body
    const finalFileName = req.file

    const addPlace = await Place.create({
      title,
      accountId,
      image: `uploads/places/${finalFileName.filename}`,
      description,
    })

    return res.jsonOK(addPlace)
  }
)

module.exports = router
