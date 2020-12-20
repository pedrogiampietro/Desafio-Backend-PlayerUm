const express = require('express')
const { Place } = require('../models')

const { checkJwt } = require('../middlewares/jwt')
const { uploadPlacesPicture } = require('../middlewares/multer')

const router = express.Router()

/* part to like in place */
router.get('/getLikes', async (req, res) => {
  const getLikes = await Place.findAll({
    attributes: ['likes_count', 'id'],
  })

  return res.jsonOK(getLikes)
})

router.post('/upLike/:id', checkJwt, async (req, res) => {
  const { id } = req.params
  const { accountid } = req.headers

  let likedPlace = await Place.findOne({
    attributes: ['likes_count', 'id', 'accountId'],
    where: { id: id },
  })

  const data = likedPlace.dataValues.likes_count

  if (data.includes(accountid))
    return res.status(400).send('Place already liked.')

  const newLike = await Place.update(
    { likes_count: [...data, Number(accountid)] },
    { where: { id } }
  )

  if (newLike) {
    likedPlace = await Place.findOne({
      attributes: ['likes_count', 'id', 'accountId'],
      where: { id: id },
    })
  }

  if (!likedPlace) return res.jsonNotFound(null)

  return res.jsonOK(likedPlace)
})

router.post('/disLike/:id', checkJwt, async (req, res) => {
  const { id } = req.params
  const { accountid } = req.headers

  let dislikedPost = await Place.findOne({
    attributes: ['likes_count', 'id', 'accountId'],
    where: { id: id },
  })

  const data = dislikedPost.dataValues.likes_count

  if (!data.includes(Number(accountid)))
    return res.status(400).send('Post not liked yet.')

  const array = data
  const index = array.indexOf(Number(accountid))
  if (index > -1) {
    array.splice(index, 1)
  }

  const disLike = await Place.update({ likes_count: array }, { where: { id } })

  if (!dislikedPost) return res.jsonNotFound(null)

  return res.jsonOK(dislikedPost)
})

/* end part like */

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

router.put('/:id', checkJwt, async (req, res) => {
  const { accountId, body } = req
  const { id } = req.params
  const fields = ['title', 'description']

  const place = await Place.findOne({ where: { id: id, accountId: accountId } })
  if (!place) return res.jsonNotFound()

  fields.map((fieldName) => {
    const newValue = body[fieldName]
    if (newValue) place[fieldName] = newValue
  })

  await place.save()
  return res.jsonOK(place)
})

router.delete('/:id', checkJwt, async (req, res) => {
  const { accountId } = req
  const { id } = req.params
  const place = await Place.findOne({ where: { id: id, accountId: accountId } })
  if (!place) return res.jsonNotFound()

  await place.destroy()
  return res.jsonOK()
})

module.exports = router
