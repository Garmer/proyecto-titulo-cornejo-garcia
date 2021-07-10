import React, { useState } from 'react'
import { Row, Col, Button, Form, Input, message } from 'antd'
import { psychologistServices } from '../../../services'

const AcademicHistoryForm = ({ form, psychologistId, degree, specialty, college }) => {

  const { getFieldDecorator, setFieldsValue } = form

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let body = {degree: values.degree, specialty: values.specialty, college: values.college}
        try {
          const response = await psychologistServices.modifyAcademicData(psychologistId, body)
          if (response.success) {
            console.log(response)
            message.success('Datos acádemicos modificados exitosamente')
          }
        } catch(error) {
          console.log(error);
          message.error('Error al registrar los datos del niño')
        }
      }
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        
        <Row gutter={24} style={{marginLeft: '20px', marginRight: '20px'}}>
          <Form.Item>
            <label className='form-title-input'>
              Grado
            </label>
            {
              getFieldDecorator('degree', {
                initialValue: degree,
                rules:
                [
                  { required: true, message: 'Por favor ingrese su grado académico'},
                ],
              })(
                <Input>
                </Input>,
              )
            }
          </Form.Item>

          <Form.Item>
            <label className='form-title-input'>
              Especialidad
            </label>
            {
              getFieldDecorator('specialty', {
                initialValue: specialty,
                rules:
                [
                  { required: true, message: 'Por favor ingrese su especialidad'},
                ],
              })(
                <Input>
                </Input>,
              )
            }
          </Form.Item>

          <Form.Item>
            <label className='form-title-input'>
              Instituto de educación superior
            </label>
            {
              getFieldDecorator('college', {
                initialValue: college,
                rules:
                [
                  { required: true, message: 'Por favor ingrese su instituto de educación superior'},
                ],
              })(
                <Input>
                </Input>,
              )
            }
          </Form.Item>
        </Row>

        <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
          <Button type="primary" htmlType="submit" disabled={false}>
            Guardar cambios
          </Button>   
        </Row>
      </Form>
    </>
  )
}

const WrappedAcademicHistoryForm = Form.create()(AcademicHistoryForm)
export default WrappedAcademicHistoryForm