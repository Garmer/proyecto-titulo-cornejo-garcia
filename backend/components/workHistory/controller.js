const WorkHistory = require("./model")


const validateWorkHistoryFields = (body) => {
  const { position, company, descriptionOfActivity, startDate, endDate, psychologistId } = body

  if (!position || !company || !descriptionOfActivity || !startDate || !psychologistId ){
    return false
  }

  return {
    position,
    company,
    descriptionOfActivity,
    startDate,
    endDate,
    psychologistId
  }
}

const createWorkHistory = async (newWorkHistory) => {
  return await WorkHistory.create(newWorkHistory)
}



module.exports = {
  validateWorkHistoryFields,
  createWorkHistory
 
}