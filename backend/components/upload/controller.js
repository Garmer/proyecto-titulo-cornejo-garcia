const response = require('../../network/response')
const upload = require('../../services/fileUpload')

const singleUpload = upload.single("file")

const uploadSingleFile = async (req, res) => {
  try {
    singleUpload(req, res, function(err) {
      if (err) {
        console.log(err)
        return response.error(req, res, 422, "Upload file failed!")
      } else {
        if (req.file) {
         response.success(req, res, { 'urlFile': req.file.location }, 201)
        } else {
          return response.error(req, res, 400, "File is empty")
        }
      }
    })
  } catch (error) {
    response.error(req, res, 500)
  }
}

module.exports = {
  uploadSingleFile
}
