const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const AWSAccessKeyId = process.env.AWS_ACCESS_KEY_ID
const AWSSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const s3BucketName = process.env.S3_BUCKET_NAME
const awsRegion = process.env.AWS_REGION

AWS.config.update({
  secretAccessKey: AWSSecretAccessKey,
  accessKeyId: AWSAccessKeyId,
  region: awsRegion
})

const s3 = new AWS.S3()

const fileFilter = (req, file, cb) => {
  if (file || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false)
  }
}

const deleteExt = arr => {
  let string = arr.map(item => {
    if (item === "jpeg" || item === "png" || item === "jpeg" || item === "mp4" || item === "mkv") {
      return item
    }
  })
  return string.join("")
}

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: s3BucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      const ext = file.mimetype.split("/")
      const type = ext[0]
      const name = deleteExt(file.originalname.split("."))
      cb(null, `${name}_${Date.now().toString()}-${type}.${ext[1]}`)
    }
  })
})

module.exports = upload