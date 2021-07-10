import React, { useState } from 'react'
import { Modal, Row, Col, Button, message } from "antd"
import { appointmentServices } from "../../services/"


const CancelAppointmentModal = ({ visible, setVisible, setCurrentAppointment, currentAppointment, getAppointments }) => {

  const handleClose = () => {
    setVisible(false)
    setCurrentAppointment(null)
  }

  const handleCancelAppointment = () => {
    try {
      let body = {appointmentStatus: 'canceled', isAppointmentScheduleReserved: false}
      const response = appointmentServices.cancelAppointment(currentAppointment.id, body)
      if (response.success) {
        handleClose()
        message.success("Cita cancelada exitosamente")
      }
    } catch (error) {
      console.log(error)
      message.error("Ocurrió un error, intente nuevamente más tarde")
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
      footer={null}
      title="¿Desea cancelar la cita?"
      width={600}
    >
      
      <Row type="flex" justify="center">
        <Col>
          <Button onClick={handleCancelAppointment}>
            Aceptar
          </Button>
          
          <Button 
            type="primary" 
            htmlType="submit" 
            className="btn-save-url-call"
          >
            Cancelar
          </Button>
          
        </Col>
      </Row>
    </Modal>
  )
}

export default CancelAppointmentModal