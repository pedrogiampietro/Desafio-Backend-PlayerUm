const multer = require('multer')

// File upload middleware (for Places Picture)
const placesPicture = multer.diskStorage({
  destination: 'uploads/places/',
  filename: (req, file, cb) => {
    const filename = file.originalname
    const finalFileName = `placesPicture-${Date.now()}-${filename}`

    cb(null, finalFileName)
  },
})

const uploadPlacesPicture = multer({
  storage: placesPicture,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/png',
      'image/jpg',
      'image/gif',
      'image/jpeg',
      'images/pjpeg',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('invalid file type.'))
    }
  },
})

module.exports = {
  placesPicture,
  uploadPlacesPicture,
}
