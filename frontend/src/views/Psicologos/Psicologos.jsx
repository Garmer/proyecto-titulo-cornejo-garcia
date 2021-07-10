import React, { useEffect, useState } from 'react'
import { Row, Col, Icon, Checkbox, Card, Tag, Button, message, Tooltip } from 'antd'
import moment from 'moment'
import { Link } from "react-router-dom"
import ContainerApp from "../../components/ContainerApp"
import { FilterPsychologistMenu } from "../../components/FilterPsychologistMenu"
import { ModalScheduleAppointment } from "../../components/Modals"
import { psychologistServices, appointmentScheduleServices, callPlatformsServices } from "../../services"
import SearchFilters from "../../components/Psychologist/SearchFilters"

const Landing = () => {

  const styles = {
    marginBetweenInputs: "20px"
  }

  const [psychologists, setPsychologists] = useState([])
  const [modalAppointmentVisible, setModalAppointmentVisible] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [callPlatforms, setCallPlatforms] = useState([])

  const openModalAppointment = async (e, psychologist) => {
    if(psychologist){
      await getAppointments(psychologist.id)
      setModalAppointmentVisible(true)
    }
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

  const getAllVerifiedPsychologists = async () => {
    try{
      const response = await psychologistServices.getAllVerifiedPsychologists()
      if(response.success){
        setPsychologists(response.data.psychologists)
      }
    }catch(error) {
      console.log(error)
      message.error("Ocurrió un error cargando áreas")
    }
  }

  function cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  const transformObjectIntoQueryString = (params) => {
    let cleanParams = cleanObject(params)
    return Object.keys(cleanParams).map(key => key + '=' + cleanParams[key]).join('&');
  }

  const findPsychologists = async (params) => {

    let queryString = transformObjectIntoQueryString(params)
    try{
      const response = await psychologistServices.findPsychologists(queryString)
      if(response.success){
        setPsychologists(response.data.psychologists)
      }
    }catch(error) {
      console.log(error)
      message.error("Ocurrió un error cargando áreas")
    }
  }

  const getAppointments = async (psychologistId) => {
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

    console.log(appointmentDates)
    return appointmentDates
  }

  useEffect(() => {
    getAllVerifiedPsychologists()
    getCallPlatforms()
  }, [])

  return (
    <ContainerApp style={{ padding: "0 20px", marginLeft: "10px", marginTop: "20px" }} >
      <Row type="flex" gutter={32}>
        <Col xs={24} md={7}  lg={5} style={{ padding: "20px 20px", border: "1px solid #e8e8e8", borderRadius: "2px" }}>
          {/* <div style={{ position: "absolute", zIndex: 2, right: 1, top: 1, padding: 4, borderRadius: 2, color: "white", background: "black", cursor: "pointer" }}>
            <Icon type="left"/>
          </div> */}
          <SearchFilters findPsychologists={findPsychologists} />
        </Col>
        <Col xs={24} md={17} lg={19}  className="col-results-search">
          <Row gutter={{ xs: 8, sm: 8, md: 16 }}>
            {psychologists.map( (psychologist, index)  => (
              <Col md={8} lg={6} xxl={4} xs={24} sm={12} style={{ marginBottom: "20px" }} key={index}>
                <Card
                  hoverable
                  bodyStyle={{ padding: "0px", margin: "0 auto" }}
                  key={index}
                >
                  <img style={{ display: "block", margin: "0 auto", objectFit: "cover", width: "100%" }} alt="example" height="180" src={psychologist.urlProfilePicture} />
                  <div style={{ lineHeight: "1.5em", height: "3em", overflow: "hidden", marginTop: "5px", padding: "0 5px" }}>
                    <Link to={"psychologist/"+psychologist.id+"/profile/public"}>
                      <span style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>{psychologist.user.name + " " + psychologist.user.lastName}</span>
                    </Link>
                  </div>
                  <div style={{ marginTop: "5px", padding: "0 5px", height: 122 }}>
                    {[...psychologist.pathologies].slice(0,3).map( pathology => {
                      return (
                        <div>
                          <Tooltip title={pathology.description} size="small">
                            <Tag className="tag-pathology">{pathology.name}</Tag>
                          </Tooltip>
                        </div>
                      )
                    })
                    }
                    <div style={{ paddingLeft: "5px" }}>
                      {psychologist.pathologies.length > 3 ?
                        <Tooltip title={[...psychologist.pathologies].slice(3).map(pathology => pathology.name).join(", ")}>
                          <span>
                            {[...psychologist.pathologies].slice(3).length + " más"}
                          </span>
                        </Tooltip>
                      :
                        null
                      } 
                    </div>
                   
                    
                  </div>
                  <div style={{ margin: "5px 0px", padding: "0 5px" }}>
                    <Button type="primary" onClick={(e) => {openModalAppointment(e, psychologist)}}>
                      Agendar cita
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
            }
          </Row>
        </Col>
      </Row>
      <ModalScheduleAppointment
        visible={modalAppointmentVisible}
        setVisible={setModalAppointmentVisible}
        appointments={appointments}
        callPlatforms={callPlatforms}
        getPsychologists={getAllVerifiedPsychologists}
      />
    </ContainerApp>
  )

}

export default Landing