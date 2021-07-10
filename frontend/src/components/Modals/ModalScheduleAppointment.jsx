import React, { useState, useEffect } from 'react'
import { Modal, Card, Calendar, Row, Col, Button, message } from "antd"
import { authServices, appointmentServices } from "../../services/"
import moment from 'moment'
import Login from "../../views/Login/"


const ModalScheduleAppointment = ({ visible, setVisible, appointments, callPlatforms, getPsychologists, getAppointments }) => {

  const [timeSelected, SetTimeSelected] = useState(null)
  const [platformSelected, setPlatformSelected] = useState(null)
  const [appointmentsCurrentDate, setAppointmentsCurrentDate] = useState([])
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)

  const schedules = [
    {
      startTime: "09:00:00",
      endTime: "10:00:00"
    },
    {
      startTime: "10:00:00",
      endTime: "11:00:00"
    },
    {
      startTime: "11:00:00",
      endTime: "12:00:00"
    },
    {
      startTime: "12:00:00",
      endTime: "13:00:00"
    },
    {
      startTime: "13:00:00",
      endTime: "14:00:00"
    },
    {
      startTime: "14:00:00",
      endTime: "15:00:00" 
    },
    {
      startTime: "15:00:00",
      endTime: "16:00:00" 
    },
    {
      startTime: "16:00:00",
      endTime: "17:00:00"
    },
    {
      startTime: "17:00:00",
      endTime: "18:00:00"
    },
    {
      startTime: "18:00:00",
      endTime: "19:00:00"
    },
    {
      startTime: "19:00:00",
      endTime: "20:00:00"
    },
  ]

  const showTimeAsHoursAndMinutes = (time) => {
    return time.substring(0, time.length - 3)
  }

  const handleClose = () => {
    setVisible(false)
    SetTimeSelected(null)
    setPlatformSelected(null)
    setStep(1)
  }

  const filterAppointmentscurrentDate = (currentDate) => {
    let appointmentsFiltered = []
    if(currentDate){
      appointmentsFiltered = appointments.filter((appointment) => {
        if(appointment.date === currentDate) return true
      })
    }

    return appointmentsFiltered
  }

  const handleSelectDate = (value, nextStep) => {
    let appointmentsCurrentDateFiltered = filterAppointmentscurrentDate(value.format("YYYY-MM-DD"))
    setAppointmentsCurrentDate(appointmentsCurrentDateFiltered)
    console.log(appointmentsCurrentDateFiltered)
    setStep(nextStep)
  }

  const handleSelectPlatform = (platform) => {
    setPlatformSelected(platform)
    setStep(4)
  } 

  const handleSelectedTime = (schedule) => {
    let scheduleSelected = getScheduleByTime(schedule)
    SetTimeSelected(scheduleSelected)
    
    setStep(3)
  }

  const getScheduleByTime = (schedule) => {
    let scheduleFound = null
    if(schedule){
      scheduleFound = appointmentsCurrentDate.find((appointment) => {
        if(appointment.startTime === schedule.startTime 
          && appointment.endTime === schedule.endTime){
            return true
          }
      })
    }
    return scheduleFound
  } 

  const isNotAvailable = (schedule) => {
    let scheduleFound = getScheduleByTime(schedule) 
    if(scheduleFound && scheduleFound.isReserved){
      return true
    }

    if (!scheduleFound){
      return true
    }

    return false
  }

  const handleConfirmAppointment = async () => {
    setSaving(true)
    let user = authServices.getLogedInUser()
    await addAppointment(timeSelected, platformSelected, user)
    setSaving(false)
  }

  const addAppointment = async (appointment, platform, user) => {
    if(user.parent){
      try {
        const response = await appointmentServices.addAppointment({
          appointmentScheduleId: appointment.id,
          callPlatformId: platform.id,
          parentId: user.parent.id
        })
        
        if (response.success){
          if(getPsychologists){
            await getPsychologists()
          }

          if(getAppointments){
            await getAppointments()
          }
          handleClose()
          message.success("Se ha reservado la hora exitosamente")
        }
      } catch (error) {
        message.error("Ocurrió un error, intente más tarde")
      }
    }
    else{
      message.error("Usuario no cuenta con los permisos necesarios para realizar esta acción")
    }
    
  }

  const goBack = () => {
    if(step === 4){
      setPlatformSelected(null)
      setStep(step - 2)
    }
    else{
      setStep(step - 1)
    }
    
  }

  return (
    <Modal
      closable
      maskClosable
      visible={visible}
      setVisible={setVisible}
      onCancel={handleClose}
      bodyStyle={{ padding: 15 }}
      style={{ top: 20 }}
      footer={null}
      title="Agenda tu cita"
      width={600}

    >
      <Card
        bodyStyle={{ width: "100%" }}
      >
        <>
          {step !== 1 ? 
            <span onClick={goBack} style={{ cursor: "pointer"}} >
              volver
            </span>
          :
            null  
          }
          {step === 1 ?
            <div className="step-schedule-appointment first-step-schedule-appoinment">
              <h3 style={{ textAlign: "center" }}>
                Selecciona uno de los días para agendar tu hora.
              </h3>
              <span className='instructions-below-label'>
                *No puedes cancelar una cita que esté por desarrollarse en menos de 24 horas.
              </span>
              <div className="pick-schedule-psychologist">
                <Calendar onSelect={(value) => { handleSelectDate(value, 2) } } disabledDate={(current) => {return  moment().add(-1, 'days') && moment().add(1, 'days') >= current }}/>
              </div>
            </div>
          : step === 2 ?
          <div className="step-schedule-appointment second-step-schedule-appoinment">
            <h3 style={{ textAlign: "center" }}>
              Selecciona una de las horas disponibles para agendar tu hora.
            </h3>
            <Row
            >
              <Col lg={10}>
                <div style={{ height: 30 }}>
                  <div style={{ height: 20, width: 20, border: "solid 1px #BDBDBD", borderRadius: "2px", display: "inline-block", position: "absolute" }}>

                  </div>
                  <div style={{ display: "inline-block", marginLeft: "25px"}}>
                    Horario disponible
                  </div>
                </div>
                <div style={{ height: 30 }}>
                  <div style={{ height: 20, width: 20, border: "solid 1px #BDBDBD", borderRadius: "2px", display: "inline-block", position: "absolute", background: "red", opacity: "0.5" }}>
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "25px"}}>
                    Horario no disponible
                  </div>
                </div>

              </Col>
              <Col lg={14}>
                <Row>
                  <Col style={{ textAlign: "center", border: "1px solid #e8e8e8", background: "#15847D", color: "white" }}>
                    Horario
                  </Col>
                  {schedules.map( (schedule) => (
                    <Col 
                      style={{ 
                        pointerEvents: isNotAvailable(schedule) ? "none" : "auto",
                        textAlign: "center", border: "1px solid #e8e8e8",
                        cursor: isNotAvailable(schedule) ? "not-allowed" : "pointer",
                        paddingTop: "10px",
                        background: isNotAvailable(schedule) ? "red" : "white",
                        opacity: isNotAvailable(schedule) ? "0.5" : "0.8",
                        color:  isNotAvailable(schedule) ? "white" : "black",
                      }}
                    >
                      <span  onClick={() => { handleSelectedTime(schedule) }} style={{display: "block"}}>
                        {showTimeAsHoursAndMinutes(schedule.startTime) + " - " + showTimeAsHoursAndMinutes(schedule.endTime)}
                      </span>
                    </Col>
                  ))
                  }
                </Row>
              </Col>
            </Row>
          </div>
          : step === 3 ||  step === 4 ?
            <div className="step-schedule-appointment second-step-schedule-appoinment">
            {!authServices.isLoggedIn() ?
              <>
                <h3 style={{ textAlign: "center" }}>
                  Para continuar y confirmar la reserva, debes iniciar sesión.
                </h3>
                <Login showOnlyParent setStep={setStep} />
              </> 
            :
              <>
                <h3 style={{ textAlign: "center" }}>
                  Selecciona en que plataforma se llevará a cabo la videoconferencia.
                </h3>
                <Row style={{ padding: "0px 5px" }}>
                  <Col lg={{offset: 4, span: 16}}  style={{ textAlign: "center", border: "1px solid #e8e8e8", color: "white", background: "#15847D" }}>
                    Plataforma
                  </Col>
                  {callPlatforms.map((platform) => {
                    return (
                      <Col 
                        lg={{offset: 4, span: 16}} 
                        style={{
                          textAlign: "center",
                          background: platformSelected &&  platformSelected.id === platform.id ? "grey" : "white",
                          color: platformSelected &&  platformSelected.id === platform.id ? "white" : "grey",
                          border: "1px solid #e8e8e8",
                          cursor: "pointer",
                        }}
                      >
                        <span  style={{ display: "block", paddingTop: "15px" }} onClick={() => { handleSelectPlatform(platform) }}> { platform.name }</span>
                      </Col>
                    )
                  })
                  }
                  
                </Row>
                <Row style={{marginTop: "20px"}}>
                  <Col>
                    <Button type="primary" loading={saving} disabled={ step !== 4 && !platformSelected } onClick={handleConfirmAppointment}>
                      Confirmar
                    </Button>
                  </Col>
                </Row>
              </>
            }
              
            </div>
          :
            null
          }
        </>
        </Card>
    </Modal>
  )
}

export default ModalScheduleAppointment