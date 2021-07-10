import React, { useEffect, useState } from 'react'
import { Icon, Button, message, Tabs, Table, Menu, Dropdown } from 'antd'
import moment from 'moment'
import { psychologistServices } from "../../../services"
import utils from "../../../utils/"
import { ModalAddUrlCall, CancelAppointmentModal, CompleteAppointmentModal } from '../../Modals'

const PsychologistAppointments = ({ psychologistId }) => {
  const { statusesAppointmentsPsychologist } = utils
  const { TabPane } = Tabs
  const [appointments, setAppointments] = useState({
    reserved: [],
    canceled: [],
    completed: []
  })
  const [modalUrlVisible, setModalUrlVisible] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const [cancelAppointment, setCancelAppointment] = useState(false)
  const [completeAppointment, setCompleteAppointment] = useState(false)

  const handleAppointmentModals = (appointment) => {
    setCurrentAppointment(appointment)
  }

  const openCompleteAppointmentModal = () => {

    let appointmentTime = currentAppointment.appointmentSchedule.startDate
    let appointmentDay = moment(currentAppointment.appointmentSchedule.startDate).utcOffset("-04:00")
    let currentDate = moment().utcOffset("-04:00")

    if (appointmentDay.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD")) {
      if (validateHours(moment(appointmentTime).utcOffset("-04:00")) === false) {
        message.error('No puedes cancelar una cita que supere las 12 horas previas a realizarse')
        setCompleteAppointment(false)
      } else {
        setCompleteAppointment(true)
      }
    } else {
      if (appointmentDay.isBefore(currentDate)) {
        message.error('No puedes completar una cita ya expirada')
        setCompleteAppointment(false)
      } else {
        setCompleteAppointment(true)
      }
    }
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

  const validateHours = (appointmentHour) => {
    let actualTime = moment().utcOffset("-04:00")

    if (actualTime.diff(appointmentHour, 'hours') >= 24) {
      return true
    }
    return false
  }

  const OptionsMenu = () => {
    return (
      <Menu>
          <Menu.Item onClick={openCompleteAppointmentModal}>
            <span>Completar cita</span>
          </Menu.Item>
          <Menu.Item onClick={openCancelAppointmentModal}>
            <span>Cancelar cita</span>
          </Menu.Item>
      </Menu>
    )
  }

  const getPsychologistAppointments = async () => {
    try {
        const response = await psychologistServices.getPsychologistAppointments(psychologistId)
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
      let appointmentsCanceled = appointments.filter( (appointment) => appointment.statusAppointment === "canceled")
      let appointmentsCompleted = appointments.filter( (appointment) => appointment.statusAppointment === "completed")

      setAppointments({
        reserved: appointmentsReserved,
        canceled: appointmentsCanceled,
        completed: appointmentsCompleted
      })
    } 
  }

  const openModalUrlCall = (data) => {
    setCurrentAppointment(data)
    setModalUrlVisible(true)
  }

  const columns = [
    {
      title: "Fecha y hora",
      dataIndex: "appointmentSchedule",
      key: "appointmentSchedule.id",
      showOnCompleted: true,
      showOnPending: true,
      showOnCanceled: true,
      render: (text, record) => {
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
      title: "Niño",
      dataIndex: "parent.child",
      key: "parent.child.id",
      showOnCompleted: true,
      showOnPending: true,
      showOnCanceled: true,
      render: (text, data) => {
        if(text){
          return (
            <span>
              {text.name + " " + text.lastName}
            </span>
          )
        }
        else{
          return null
        }
      }
    },
    {
      title: "Plataforma videoconferencia",
      dataIndex: "callPlatform.name",
      key: "callPlatform.id",
      showOnCompleted: true,
      showOnPending: true,
      showOnCanceled: true,
    },
    {
      title: "Link videoconferencia",
      dataIndex: "urlCall",
      key: "urlCall",
      showOnCompleted: true,
      showOnPending: true,
      showOnCanceled: true,
      render: (text, data) => {
        if(text){
          return (
            <span style={{ display: "block" }} >
            <Icon type="edit" style={{ cursor: "pointer" }} onClick={() => { openModalUrlCall(data) }}/>
            <span style={{ marginLeft: '10px'}}>
              {text}
            </span>
          </span>
          )
          
        }else{
          return (
            <span style={{ display: "block", cursor: "pointer" }}  onClick={() => { openModalUrlCall(data) }} >
              <Icon type="plus-circle" />
              <span style={{ marginLeft: '10px'}}>
                Agregar link
              </span>
            </span>
          )
          
        }
      }
    },
    {
      showOnCompleted: false,
      showOnPending: true,
      showOnCanceled: false,
      render: (text, data) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Dropdown overlay={OptionsMenu} placement="bottomRight" trigger={["click"]} onClick={() => {handleAppointmentModals(data)}}>
              <a className="ant-dropdown-link" >
                <Icon type="more" style={{ fontSize: '20px', color: 'black' }}/>
              </a>
            </Dropdown>
          </div>
        )
      }
    },
  ]

  const hideColumns = (columns, statusAppointments) => {
    return columns.filter((column) => {
      if((statusAppointments === "completed") && (column.showOnCompleted)){
        return true
      }
      if ((statusAppointments === "reserved") && (column.showOnPending)) {
        return true
      }
      else {
        if ((statusAppointments === "canceled") && (column.showOnCanceled)) {
          return true
        }
        return false
      }
    })
  } 

  useEffect(() => {
    getPsychologistAppointments()
  }, [])

  return (
    <>
      <Tabs type='card'>
        {Object.keys(statusesAppointmentsPsychologist).map( (status, index) => {
          return (
            <TabPane tab={statusesAppointmentsPsychologist[status]} key={index}>
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
      {modalUrlVisible ?
        <ModalAddUrlCall 
          visible={modalUrlVisible}
          setVisible={setModalUrlVisible}
          setCurrentAppointment={setCurrentAppointment}
          currentAppointment={currentAppointment}
          getAppointments={getPsychologistAppointments}
        />
      :
        null
      }
      {cancelAppointment ?
        <CancelAppointmentModal
          visible={cancelAppointment}
          setVisible={setCancelAppointment}
          currentAppointment={currentAppointment}
          setCurrentAppointment={setCurrentAppointment}
          getAppointments={getPsychologistAppointments}
        />
      :
        null
      }
      {completeAppointment ?
        <CompleteAppointmentModal
          visible={completeAppointment}
          setVisible={setCompleteAppointment}
          currentAppointment={currentAppointment}
          setCurrentAppointment={setCurrentAppointment}
          getAppointments={getPsychologistAppointments}
        />
      :
        null
      }
    </>
  )

}

export default PsychologistAppointments