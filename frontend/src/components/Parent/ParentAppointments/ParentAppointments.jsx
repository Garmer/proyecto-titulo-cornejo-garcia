import React, { useEffect, useState } from 'react'
import { Row, Col, Icon, Checkbox, Card, Tag, Button, message, Tooltip, Rate, Tabs, Table, Menu, Dropdown, Select } from 'antd'
import moment from 'moment'
import { parentServices } from "../../../services"
import utils from "../../../utils/"
import { ModalAppointmentReview, CancelAppointmentModal } from '../../Modals'

const ParentAppointments = ({ parentId }) => {
  const { statusesAppointmentsParent } = utils
  const { TabPane } = Tabs
  const [appointments, setAppointments] = useState({
    reserved: [],
    completed: []
  })

  const [modalReviewVisible, setModalReviewVisible] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const rateDescription = ['muy mala', 'mala', 'promedio', 'buena', 'excelente']
  const [cancelAppointment, setCancelAppointment] = useState(false)

  const handleAppointmentCancel = (appointment) => {
    setCurrentAppointment(appointment)
  }

  const openCancelAppointmentModal = () => {

    let appointmentTime = currentAppointment.appointmentSchedule.startDate
    let appointmentDay = moment(currentAppointment.appointmentSchedule.startDate).utcOffset("-04:00")
    let currentDate = moment().utcOffset("-04:00")

    if (appointmentDay.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD")) {
      if (validateHours(moment(appointmentTime).utcOffset("-04:00")) === false) {
        message.error('No puedes cancelar una cita que supere las 12 horas previas a realizarse')
        setCancelAppointment(false)
      } else {
        setCancelAppointment(true)
      }
    } else {
      if (appointmentDay.isBefore(currentDate)) {
        message.error('No puedes cancelar una cita ya expirada')
        setCancelAppointment(false)
      } else {
        setCancelAppointment(true)
      }
    }
  }

  const OptionsMenu = () => {
    return (
      <Menu>
          <Menu.Item onClick={openCancelAppointmentModal}>
            <span>Cancelar cita</span>
          </Menu.Item>
      </Menu>
    )
  }

  const validateHours = (appointmentHour) => {
    let actualTime = moment().utcOffset("-04:00")

    if (actualTime.diff(appointmentHour, 'hours') >= 24) {
      return true
    }
    return false
  }

  const openModalReview = (data) => {
    setCurrentAppointment(data)
    setModalReviewVisible(true)
  }

  const getParentAppointments = async () => {
  try {
      const response = await parentServices.getParentAppointments(parentId)
      if(response.success){
        filterAppointments(response.data.appointments)
      }
  } catch (error) {
    console.log(error)
    message.error("Ocurrió un error al cargar las citas, intente nuevamente más tarde")
  } 
  }

  const filterAppointments = (appointments) => {
    if(appointments){
      let appointmentsReserved = appointments.filter( (appointment) => appointment.statusAppointment === "reserved")
      let appointmentsCompleted = appointments.filter( (appointment) => appointment.statusAppointment === "completed")

      setAppointments({
        reserved: appointmentsReserved,
        completed: appointmentsCompleted
      })
    } 
  }

  const columns = [
    {
      title: "Fecha y hora",
      dataIndex: "appointmentSchedule",
      key: "appointmentSchedule.id",
      showOnCompleted: true,
      showOnPending: true,
      render: (text, record, key) => {
        if(record.appointmentSchedule && record.appointmentSchedule.startDate){
          return (
            <span>
              {
              moment(record.appointmentSchedule.startDate).utcOffset("-04:00").format("YYYY-MM-DD") + " " +
              moment(record.appointmentSchedule.startDate).utcOffset("-04:00").format("HH:mm:ss")
              }
            </span>
          )
        }
        else{
          return null
        }
      }
    },
    {
      title: "Psicologo",
      dataIndex: "appointmentSchedule.psychologist",
      key: "appointmentSchedule.createdAt",
      showOnCompleted: true,
      showOnPending: true,
      render: (text, record, key) => {
        if(record.appointmentSchedule && record.appointmentSchedule.psychologist && record.appointmentSchedule.psychologist.user){
          return (
            <span>
              {record.appointmentSchedule.psychologist.user.name + " " + record.appointmentSchedule.psychologist.user.lastName}
            </span>
          )
        }
        else{
          return null
        }
      }
    },
    {
      showOnCompleted: true,
      showOnPending: true,
      title: "Plataforma videoconferencia",
      dataIndex: "callPlatform.name",
      key: "callPlatform.id"
      
    },
    {
      showOnCompleted: true,
      showOnPending: true,
      title: "Link videoconferencia",
      dataIndex: "urlCall",
      key: "urlCall",
      render: (text, data) => {
        return (
          text
        )
      }
    },
    {
      title: "Evaluación cita",
      dataIndex: "appointmentReview",
      showOnCompleted: true,
      showOnPending: false,
      render: (text, data) => {
        if (text){
          return (
            <span style={{ display: "block" }}>
              <span>
                <Rate tooltips={rateDescription} value={text.score} disabled/>
              </span>
            </span>
          )
        }
        else {
          return (
            <span style={{ display: "block", cursor: "pointer" }} onClick={() => { openModalReview(data) }}>
              <Icon type="plus-circle" />
              <span style={{ marginLeft: '10px'}}>
                Agregar evaluación
              </span>
            </span>
          )
        }
      }
    },
    {
      showOnCompleted: false,
      showOnPending: true,
      render: (text, data) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Dropdown overlay={OptionsMenu} placement="bottomRight" trigger={["click"]} onClick={() => {handleAppointmentCancel(data)}}>
              <a className="ant-dropdown-link" >
                <Icon type="more" style={{ fontSize: '20px', color: 'black' }}/>
              </a>
            </Dropdown>
          </div>
        )
      }
    }
  ]

  const hideColumns = (columns, statusAppointments) => {
    return columns.filter((column) => {
      if((statusAppointments === "completed") && (column.showOnCompleted)){
        return true
      }
      else{
        if ((statusAppointments === "reserved") && (column.showOnPending)) {
          return true
        }
        return false
      }
    })
  } 


  useEffect(() => {
    getParentAppointments()
  }, [])

  return (
    <>
      <Tabs type='card'>
        {Object.keys(statusesAppointmentsParent).map( (status, index) => {
          return (
            <TabPane tab={statusesAppointmentsParent[status]} key={index}>
              <Table
                bordered 
                dataSource={appointments[status]}
                columns={hideColumns(columns, status)}
              />
            </TabPane>
          )
        })
        }
      </Tabs>
      {modalReviewVisible ?
        <ModalAppointmentReview
          parentId={parentId}
          visible={modalReviewVisible}
          setVisible={setModalReviewVisible}
          getAppointments={getParentAppointments}
          currentAppointment={currentAppointment}
          setCurrentAppointment={setCurrentAppointment}
        />
      :
        null
      }
      {cancelAppointment ?
        <CancelAppointmentModal
          parentId={parentId}
          visible={cancelAppointment}
          setVisible={setCancelAppointment}
          getAppointments={getParentAppointments}
          currentAppointment={currentAppointment}
          setCurrentAppointment={setCurrentAppointment}
        />
      :
        null
      }
    </>
  )

}

export default ParentAppointments