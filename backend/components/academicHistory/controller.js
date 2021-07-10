const AcademicHistory = require("./model")

const validateAcademicHistoryFields = (body) => {
  const { degree, specialty, college, psychologistId, urlDegreeCertificate } = body

  if (!degree || !specialty || !college || !psychologistId, !urlDegreeCertificate){
    return null
  }

  return {
    degree,
    specialty,
    college,
    psychologistId,
    urlDegreeCertificate
  }

}

const createAcademicHistory = async (academicHistory) => {
  return await AcademicHistory.create(academicHistory)
}

module.exports = {
  validateAcademicHistoryFields,
  createAcademicHistory
}