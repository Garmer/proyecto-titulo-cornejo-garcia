import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Button, Avatar, Icon, Spin } from 'antd'
import { withRouter } from "react-router-dom"
import moment from "moment"
import ContainerApp from "../../components/ContainerApp"
import { ModalScheduleAppointment } from "../../components/Modals"
import { psychologistServices, appointmentScheduleServices, callPlatformsServices } from "../../services"

const PublicPsychologist = ({ match }) => {

  const [psychologist, setPsychologist] = useState(null)
  const [psychologistId, setPsychologistId] = useState(match.params.id)
  const [appointments, setAppointments] = useState([])
  const [callPlatforms, setCallPlatforms] = useState([])
  const [modalAppointmentVisible, setModalAppointmentVisible] = useState(false)
  
  const loadPsychologist = async () => {
    try {
      const response = await psychologistServices.getPublicPsychologist(psychologistId)
      if (response.success) {
        console.log(response.data.psychologist)
        setPsychologist(response.data.psychologist)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAppointments = async () => {
    try {
      const response = await appointmentScheduleServices.getPsychologistAppointmentsSchedulePublic(psychologistId)
      if(response.success){
        let appointmentsFormatted = formatAndSetAppoinmentDates(response.data.appointments)
        setAppointments(appointmentsFormatted)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formatAndSetAppoinmentDates = (appointments) => {
    let appointmentDates = []
    if(appointments){
      appointmentDates = appointments.map( appointmentDate => {
        let momentStartDate = moment(appointmentDate.startDate).utcOffset("-04:00").format("YYYY-MM-DD")
        let startTime = moment(appointmentDate.startDate).utcOffset("-04:00").format("HH:mm:ss")
        let endTime = moment(appointmentDate.endDate).utcOffset("-04:00").format("HH:mm:ss")

        return {
          id: appointmentDate.id,
          date: momentStartDate,
          startTime,
          endTime,
          isReserved: appointmentDate.isReserved
        }
      })
    }

    return appointmentDates
  }

  const getCallPlatforms = async () => {
    try {
      const response = await callPlatformsServices.getCallPlatforms()
      if(response.success){
        setCallPlatforms(response.data.callPlatforms)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const openModalAppointment = async () => {
    setModalAppointmentVisible(true)
  }

  useEffect(() => {
    loadPsychologist()
    getCallPlatforms()
    getAppointments()
  }, [])

  return (
    <ContainerApp>
      <Row align='middle' justify='space-around'>
      {
        ((psychologist) && (psychologist.user))
        ?
          <>
            {/* Container con el Avatar, Nombre, Descripción y botón 'Agendar cita' */}
            <Row className='public-profile-user-data-container'>
              <Col xs={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar className="card-profile-picture" src={psychologist.urlProfilePicture}/>
              </Col>

              <Col xs={24} md={16}>
                <Row>
                  <h1 className="col-text-name" style={{ fontWeight: 'bold', display: 'block' }}>{psychologist.user.name + " " + psychologist.user.lastName}</h1>
                  <p className="col-text-data">
                    {psychologist.description}
                  </p>
                </Row>

                
                  <Button className="card-modal-button" type="primary" onClick={openModalAppointment}>
                    Agendar cita
                  </Button>
                
              </Col>
            </Row>


            <Row>
              {/* Título del Container */}
              <Row style={{ marginLeft: '20px' }}>
                <Icon type="file-text" style={{ fontSize: '24px' }} />
                <span style={{ fontWeight: 'bold', color: '#15847D', fontSize: '24px' }}>
                  Metodología de trabajo
                </span>
              </Row>

              {/* Container 'Áreas de atención y modelo de trabajo terapéutico' */}
              <Row className='public-profile-card-data-container'>
                <Col span={10} className="col-card-data">
                  <span style={{ fontWeight: 'bold' }}>Áreas de atención</span>
                  <ul>
                    {
                      psychologist.pathologies.map( item => (  
                        <li>{item.name}</li>
                      ))
                    }
                  </ul>
                </Col>
                <Col span={10} className="col-card-data">
                  <span style={{ fontWeight: 'bold' }}>Modelo de trabajo terapéutico</span>
                  <p>{psychologist.workModel.name}</p>
                </Col>
              </Row>
            </Row>


            <Row>
              {/* Título del Container */}
              <Row style={{ marginLeft: '20px' }}>
                <Icon type="idcard" style={{ fontSize: '24px' }} />
                <span style={{ fontWeight: 'bold', color: '#15847D', fontSize: '24px' }}>
                  Experiencia profesional
                </span>
              </Row>

              {/* Container 'Experiencia profesional */}
              <Row className='public-profile-card-data-container'>
                <Row>
                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Compañía/Empresa</span>
                    <p>{psychologist.workHistories[0].company}</p>
                  </Col>
                    
                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Cargo</span>
                    <p>{psychologist.workHistories[0].position}</p>
                  </Col>
                </Row>

                <Row>
                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Fecha de Inicio</span>
                    <p>{psychologist.workHistories[0].startDate}</p>
                  </Col>

                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Fecha de Término</span>
                    <p>{psychologist.workHistories[0].endDate}</p>
                  </Col>
                </Row>

              </Row>
            </Row>


            <Row>
              {/* Título del Container */}
              <Row style={{ marginLeft: '20px' }}>
                <Icon type="book" style={{ fontSize: '24px' }} />
                <span style={{ fontWeight: 'bold', color: '#15847D', fontSize: '24px' }}>
                  Experiencia académica
                </span>
              </Row>

              {/* Container 'Experiencia académica */}
              <Row className='public-profile-card-data-container' justify="center">
                <Row>
                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Instituto de Educación Superior</span>
                    <p>{psychologist.academicHistories[0].college}</p>
                  </Col>
                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Título</span>
                    <p>{psychologist.academicHistories[0].degree}</p>
                  </Col>
                </Row>

                <Row>
                  <Col span={10} className="col-card-data">
                    <span style={{ fontWeight: 'bold' }}>Especialidad</span>
                    <p>{psychologist.academicHistories[0].specialty}</p>
                  </Col>
                </Row>
              </Row>
            </Row>

          </>
        : <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin/>}/>
      }
      </Row>
      <ModalScheduleAppointment
        visible={modalAppointmentVisible}
        setVisible={setModalAppointmentVisible}
        appointments={appointments}
        callPlatforms={callPlatforms}
        getAppointments={getAppointments}
      />
    </ContainerApp>
  )
}

export default withRouter(PublicPsychologist)