import React, { useState } from 'react'
import { Modal, Row, Col, Button, message, Input, Form, Rate } from "antd"
import { appointmentReviewServices } from "../../services/"


const ModalAppointmentReview = ({ visible, setVisible, form, parentId, currentAppointment, setCurrentAppointment, getAppointments }) => {

  const { TextArea } = Input
  const { getFieldDecorator } = form

  const [saving, setSaving] = useState(false)
  const [rate,setRate] = useState(null)
  const rateDescription = ['muy mala', 'mala', 'promedio', 'buena', 'excelente']

  const handleRateChange = (value) => {
    setRate(value);
  }
  
  const handleClose = () => {
    setVisible(false)
    setCurrentAppointment(null)
  }

  const updateReview = async (body) => {
    try {
      setSaving(true)
      const response = await appointmentReviewServices.addAppointmentReview(body)
      if(response.success){
        await getAppointments()
        handleClose()
        message.success("Evaluación realizada exitosamente")
      }
      setSaving(false)
    } catch (error) {
      setSaving(false)
      console.log(error)
      message.error("Ocurrió un error, intente nuevamente más tarde")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if(!err){
        let body = {appointmentId: currentAppointment.id, parentId: parentId, comment: values.comment, score: rate }
        updateReview(body)
      }
    })
  }

  return (
    
    <Modal
      title={currentAppointment.appointmentSchedule.psychologist.user.name+" "+currentAppointment.appointmentSchedule.psychologist.user.lastName}
      visible={visible}
      setVisible={setVisible}
      onCancel={handleClose}
      footer={[
      <Button onClick={handleSubmit}>
        Confirmar
      </Button>,
      <Button key="back" onClick={handleClose}>
        Cancelar
      </Button>,
    ]}>
      <Form /* onSubmit={handleSubmit} */>
        <Row type="flex" justify="center">

          {/* Caja de comentarios */}
          <Col span={24}>
            <h2 style={{textAlign:'center'}}>Comentario</h2>
            <Form.Item>
              {
                getFieldDecorator('comment', {
                  //initialValue: currentAppointment.appointmentReview ? currentAppointment.appointmentReview.comment : '',
                  rules:
                  [
                    { required: false, message: 'Danos a conocer tu experiencia' }
                  ],
                })(
                  <TextArea rows={10} placeholder="Comentario"/>
                )
              }
            </Form.Item>
          </Col>

          {/* Estrellas de puntuación */}
          <Col span={7}>
            <h2 style={{textAlign:'center'}}>Evaluación</h2>
            <Form.Item>
              {
                getFieldDecorator('score', {
                  //initialValue: currentAppointment.appointmentReview ? currentAppointment.appointmentReview.score : null,
                  rules:
                  [
                    { required: true, message: 'Seleccione un puntaje' }
                  ],
                })(
                  <Rate tooltips={rateDescription} onChange={handleRateChange}/>
                )
              }
            </Form.Item>
          </Col>
        
        </Row>
      </Form>
    </Modal>
  )
}

const WrappedModalAppointmentReviewForm = Form.create()(ModalAppointmentReview)
export default WrappedModalAppointmentReviewForm