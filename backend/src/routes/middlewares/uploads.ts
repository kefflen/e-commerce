import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.floor(Math.random() * 1000)}-${file.originalname}`,
    )
  },
})

export const upload = multer({ storage })
