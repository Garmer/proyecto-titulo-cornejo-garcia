import React, { useState, useEffect } from 'react'
import { Modal, Card, Calendar, Row, Col, Button, message, Input, Form } from "antd"
import { appointmentServices } from "../../services/"


const ModalAddUrlCall = ({ visible, setVisible, form, setCurrentAppointment, currentAppointment, getAppointments }) => {

  const { getFieldDecorator } = form
  const [saving, setSaving] = useState(false)

  console.log(currentAppointment)
  
  const handleClose = () => {
    setVisible(false)
    setCurrentAppointment(null)
  }
  const updateUrlCall = async (body) => {
    try {
      setSaving(true)
      const response = await appointmentServices.updateUrlCall(currentAppointment.id, body)
      if(response.success){
        await getAppointments()
        handleClose()
        message.success("link videoconferencia guardado")
      }
      setSaving(false)
    } catch (error) {
      setSaving(false)
      console.log(error)
      message.error("Ocurrió un error, intente nuevamnete más tarde")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields( async (err, values) => {
      if(!err){
        updateUrlCall(values)
      }
    })
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
      title="Agregar link videoconferencia"
      width={600}
    >
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={24} md={18}>
            <Form.Item>
            {
              getFieldDecorator('urlCall', {
                initialValue: currentAppointment ? currentAppointment.urlCall : null,
                rules:
                [
                  { required: true, message: 'Ingresar link videoconferencia'},
                ],
              })(
                <Input 
                  placeholder="link videoconferencia"
                />
              )
            }
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="btn-save-url-call"
                loading={saving}
              >
                Guardar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      
    </Modal>
  )
}

const WrappedModalUrlForm = Form.create()(ModalAddUrlCall)
export default WrappedModalUrlForm