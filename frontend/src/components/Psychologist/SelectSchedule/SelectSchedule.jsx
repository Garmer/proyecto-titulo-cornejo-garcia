import React, { useState, useEffect } from 'react'
import moment from "moment"
import { withRouter } from "react-router-dom"
import { Table, Calendar, Modal, Button, Badge, message } from "antd"
import { appointmentScheduleServices } from "../../../services/"


const SelectSchedule = ({ datesReserved, match }) => {
  const [modal, setModal] = useState(false)
  const [currentDateSelected, setCurrentDateSelected] = useState(null)
  const [currentDateSelectedOriginalFormat, setCurrentDateSelectedOriginalFormat] = useState(null)
  const [appointments, setAppointments] = useState(null)
  const psychologistId = match.params.id
  const [ selectedRowsTimeTable, setSelectedRowsTimeTable] = useState([])
  const [ selectedRowsTimeTableAtStart, setSelectedRowsTimeTableAtStart] = useState([])
  const [loading, setLoading] = useState(false)

  const showTimeAsHoursAndMinutes = (time) => {
    return time.substring(0, time.length - 3)
  }

  const columnasHorarios = [
    {
      key: 'horas',
      title: 'Horas',
      dataIndex: 'date',
      render: (text, record, index) => {
        return (
          <span>
            {showTimeAsHoursAndMinutes(record.date.startTime) + " - " + showTimeAsHoursAndMinutes(record.date.endTime)}
          </span>
        )
      }
    },
  ]

  const dataHorarios = [
    {
      key: '1',
      date: {
        startTime: "09:00:00",
        endTime: "10:00:00"
      }
    },
    {
      key: '2',
      date: {
        startTime: "10:00:00",
        endTime: "11:00:00"
      }
    },
    {
      key: '3',
      date: {
        startTime: "11:00:00",
        endTime: "12:00:00"
      }
    },
    {
      key: '4',
      date: {
        startTime: "12:00:00",
        endTime: "13:00:00"
      }
    },
    {
      key: '5',
      date: {
        startTime: "13:00:00",
        endTime: "14:00:00"
      }
    },
    {
      key: '6',
      date: {
        startTime: "14:00:00",
        endTime: "15:00:00"
      }
    },
    {
      key: '7',
      date: {
        startTime: "15:00:00",
        endTime: "16:00:00"
      }
    },
    {
      key: '8',
      date: {
        startTime: "16:00:00",
        endTime: "17:00:00"
      }
    },
    {
      key: '9',
      date: {
        startTime: "17:00:00",
        endTime: "18:00:00"
      }
    },
    {
      key: '10',
      date: {
        startTime: "18:00:00",
        endTime: "19:00:00"
      }
    },
    {
      key: '11',
      date: {
        startTime: "19:00:00",
        endTime: "20:00:00"
      }
    },
  ]

  const openModal = (dateMoment) => {
    if(dateMoment){
      setModal(true);
      setCurrentDateSelected(dateMoment.format("DD-MM-YYYY"))
      setCurrentDateSelectedOriginalFormat(dateMoment.format("YYYY-MM-DD"))
    }
  }

  const closeModal = () => {
    setSelectedRowsTimeTable([])
    setSelectedRowsTimeTableAtStart([])
    setCurrentDateSelected(null)
    setModal(false);
  }

  const searchAppointmentByDate = (date) => {
    
  }

  const isReserved = (date) => {
    let appointmentsCurrentDate = getAppointmentsCurrentDate()
    if(appointmentsCurrentDate){
      for (let i = 0; i < appointmentsCurrentDate.length; i++){
        if (appointmentsCurrentDate[i].startTime == date.date.startTime &&
          appointmentsCurrentDate[i].endTime == date.date.endTime && appointmentsCurrentDate[i].isReserved){
            return true
          }
      }
    }

    return false
  
  }

  const setSelectedRowKeysTimeTable = () => {
    let rowsSelected = []
    let appointmentsCurrentDate = getAppointmentsCurrentDate()
    if (appointmentsCurrentDate){
      for(let i = 0; i < appointmentsCurrentDate.length ; i++){
        let rowToBeSelected = getRowKeyDate(appointmentsCurrentDate[i])
        if(rowToBeSelected){
          rowsSelected.push(rowToBeSelected)
        }
      }
    }

    setSelectedRowsTimeTable(rowsSelected)
    setSelectedRowsTimeTableAtStart(rowsSelected)
    
  }

  const getRowKeyDate = (date) => {
    
    if(date){
      for (let i = 0; i < dataHorarios.length; i++){
        if (dataHorarios[i].date.startTime == date.startTime &&
          dataHorarios[i].date.endTime == date.endTime){
            return dataHorarios[i].key
        }
      }
    }

    return null
  }

  const getAppointmentsCurrentDate = () => {
    let appointmentsDate = []

    if(appointments && currentDateSelected){
      appointmentsDate = appointments.filter( (appointment) => appointment.date == currentDateSelected)
    }

    return appointmentsDate
  }

  const rowSelection = {
    hideDefaultSelections: true,
    onChange: (selectedRowKeys) => {
      setSelectedRowsTimeTable(selectedRowKeys)
    },
    getCheckboxProps: record => ({
      disabled: isReserved(record),
      name: record.name,
    }),
    selectedRowKeys: selectedRowsTimeTable
  };

  const getAppointments = async () => {
    try {
      const response = await appointmentScheduleServices.getPsychologistAppointmentsSchedule(psychologistId)
      if(response.success){
        let appointmentsFormatted = formatAndSetAppoinmentDates(response.data.appointments)
        setAppointments(appointmentsFormatted)
        setSelectedRowKeysTimeTable(appointmentsFormatted)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formatAndSetAppoinmentDates = (appointments) => {
    let appointmentDates = []
    if(appointments){
      appointmentDates = appointments.map( appointmentDate => {
        let momentStartDate = moment(appointmentDate.startDate).utcOffset("-04:00").format("DD-MM-YYYY")
        let startTime = moment(appointmentDate.startDate).utcOffset("-04:00").format("HH:mm:ss")
        let endTime = moment(appointmentDate.endDate).utcOffset("-04:00").format("HH:mm:ss")
        console.log(momentStartDate, startTime, endTime)
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

  const getListData = (value) => {
    return [
      { type: 'error', content: null }
    ]
  } 

  const dateCellRender = (value) =>  {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }


  const updatePsychologistAppointmentsSchedule = async (schedulesToUpdate) => {
    try {
      message.loading("Guardando ...")
      setLoading(true)
      const response = await appointmentScheduleServices.updatePsychologistAppointmentsSchedule(psychologistId, schedulesToUpdate)
      message.destroy()
      if(response.success){
        await getAppointments()
        setModal(false)
        message.success("Se actualizó el horario")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.destroy()
      console.log(error)
      message.error("Ocurrió un error , intente nuevamente más tarde")
    }
  }

  const saveAppointmentsSchedule = async () => {
    let newSchedulesKeySelected = getNewSchedulesKeysSelected(selectedRowsTimeTable, selectedRowsTimeTableAtStart)
    let schedulesKeysRemoved = getSchedulesKeysRemoved(selectedRowsTimeTable, selectedRowsTimeTableAtStart)
    
    let schedulesToUpdate = getSchedulesToUpdate(newSchedulesKeySelected, schedulesKeysRemoved)
    
    await updatePsychologistAppointmentsSchedule(schedulesToUpdate)
  }

  const getSchedulesToUpdate = (newSchedulesKeySelected, schedulesKeysRemoved) => {
    let schedulesToSave = {
      schedulesToDelete: [],
      schedulesToSave: []
    }

    if(newSchedulesKeySelected && schedulesKeysRemoved){
      schedulesToSave.schedulesToDelete = getSchedulesToDelete(schedulesKeysRemoved)
      schedulesToSave.schedulesToSave = getSchedulesToSave(newSchedulesKeySelected)
    }

    return schedulesToSave
  }

  const getSchedulesToSave = (newSchedulesKeySelected) => {
    let schedulesToSave = []
    if(newSchedulesKeySelected){
      for(let i = 0; i < newSchedulesKeySelected.length ; i++){
        let key = newSchedulesKeySelected[i]
        console.log(currentDateSelected)
        schedulesToSave.push({
          date: currentDateSelectedOriginalFormat,
          startTime: dataHorarios[parseInt(key) - 1].date.startTime,
          endTime: dataHorarios[parseInt(key) - 1].date.endTime
        })
        
      }
    }

    return schedulesToSave
  }

  const getSchedulesToDelete = (schedulesKeysRemoved) => {
    let schedulesToDelete = []
    
    if(schedulesKeysRemoved){
      for(let i = 0; i < schedulesKeysRemoved.length ; i++){
        let key = schedulesKeysRemoved[i]
        schedulesToDelete.push({
          date: currentDateSelected,
          startTime: dataHorarios[parseInt(key) - 1].date.startTime,
          endTime: dataHorarios[parseInt(key) - 1].date.endTime
        })
        
      }
    }

    let schedulesAppointments = getSchedulesFromAppointments(schedulesToDelete)

    return schedulesAppointments
  }

  const getSchedulesFromAppointments = (schedulesToDelete) => {
    let  schedulesAppointments = []

    if (schedulesToDelete && appointments){
      for (let schedule of schedulesToDelete){
        let scheduleAppointmentFound = appointments.find( appointment => {
          if(appointment.startTime == schedule.startTime &&
            appointment.endTime == schedule.endTime){
            return true
          }
          else{
            return false
          }
        })

        if(scheduleAppointmentFound){
          schedulesAppointments.push(scheduleAppointmentFound)
        }
      }
    }

    return schedulesAppointments
  }

  const getNewSchedulesKeysSelected = (selectedRowKeys, selectedRowKeysAtStart) => {
    let newSchedules = []
    if(selectedRowKeys && selectedRowKeysAtStart){
      newSchedules = selectedRowKeys.filter( selectedRow => {
        if (!selectedRowKeysAtStart.includes(selectedRow)){
          return true
        }
        else{
          return false
        }
      })
    }

    return newSchedules
  }

  const getSchedulesKeysRemoved = (selectedRowKeys, selectedRowKeysAtStart) => {
    let newSchedules = []
    if(selectedRowKeys && selectedRowKeysAtStart){
      newSchedules = selectedRowKeysAtStart.filter( selectedRow => {
        if (!selectedRowKeys.includes(selectedRow)){
          return true
        }
        else{
          return false
        }
      })
    }

    return newSchedules
  }

  useEffect(() => {
    getAppointments()
  }, [])

  useEffect(() => {
    if(currentDateSelected){
      setSelectedRowKeysTimeTable()
    }
  },[currentDateSelected, appointments] )

  return (
    <div className="pick-schedule-psychologist">
      <Calendar 
        onSelect={openModal}
        // dateCellRender={dateCellRender}
        disabledDate={(current) => {return moment().add(-1, 'days') >= current}}
        locale={{
          "lang": {
            "locale": "es-ES",
            "today": "Actualidad",
            "month": "Mes",
            "year": "Año",
          },
        }}
      />
      {modal ?
        <Modal
          title={currentDateSelected}
          visible={modal}
          onCancel={closeModal}
          footer={<Button type="primary" loading={loading} onClick={saveAppointmentsSchedule}>Confirmar</Button>}
        >
        <Table 
          bordered 
          pagination={false} 
          dataSource={dataHorarios} 
          columns={columnasHorarios} 
          rowSelection={rowSelection}
        />
      </Modal>
      :
        null
      }
      
    </div>
  )
}

export default withRouter(SelectSchedule)