import React, { useState } from 'react'
import { Row, Col, Button, Form, Input, DatePicker, message } from 'antd'
import { psychologistServices } from '../../../services'
import moment from 'moment'

const WorkHistoryForm = ({ form, psychologistId, position, company, descriptionOfActivity, startDate, endDate }) => {

  const { getFieldDecorator, setFieldsValue } = form

  //<---------- FUNCIONES PARA VALIDAR LOS INPUTS RELACIONADOS A FECHAS  ---------->

  const validateStartDate = (rule, value, callback) => {
    let fechaActual = new Date()
    
    if (value && value > fechaActual){
      callback('Ingrese una fecha válida');
    } 
    else if (value && value.isAfter(form.getFieldValue('endDate'))){
      callback('La fecha de inicio no puede ocurrir después que la fecha de término');
    } else {
      callback();
    }

  }

  const validateEndDate = (rule, value, callback) => {
    let fechaActual = new Date()

    if (value && value > fechaActual){
      callback('Ingrese una fecha válida');
    } else if (value && value.isBefore(form.getFieldValue('startDate'))){
      callback('La fecha de término no puede ocurrir antes que la fecha de inicio');
    } else {
      callback()
    }
  }

  //<-------------------------------------------------->

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let body = {}
        try {
          const response = await psychologistServices.modifyWorkData(psychologistId, body)
          if (response.success) {
            console.log(response)
            message.success('Datos profesionales modificados exitosamente')
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
              Puesto
            </label>
            {
              getFieldDecorator('position', {
                initialValue: position,
                rules:
                [
                  { required: true, message: 'Por favor ingrese un cargo'},
                ],
              })(
                <Input>
                </Input>,
              )
            }
          </Form.Item>

          <Form.Item>
            <label className='form-title-input'>
              Lugar
            </label>
            {
              getFieldDecorator('company', {
                initialValue: company,
                rules:
                [
                  { required: true, message: 'Por favor ingrese una empresa/compañia'},
                ],
              })(
                <Input>
                </Input>,
              )
            }
          </Form.Item>

          <Form.Item>
            <label className='form-title-input'>
              Descripción de Actividades
            </label>
            {
              getFieldDecorator('descriptionOfActivity', {
                initialValue: descriptionOfActivity,
                rules:
                [
                  { required: true, message: 'Por favor describa las actividades realizadas' },
                ],
              })(
                <Input>
                </Input>,
              )
            }
          </Form.Item>

          <Form.Item>
            <label className='form-title-input'>
              Fecha de Inicio
            </label>
            {
              getFieldDecorator('startDate', {
                initialValue: startDate ? moment(startDate) : null,
                rules:
                [
                  { required: true, message: 'Por favor ingrese una fecha' },
                  { validator: validateStartDate },
                ],
              })(
                <DatePicker placeholder='' showToday={true}/>,
              )
            }
          </Form.Item>

          <Form.Item>
            <label className='form-title-input'>
              Fecha de Termino
            </label>
            {
              getFieldDecorator('endDate', {
                initialValue: endDate ? moment(endDate) : null,
                rules:
                [
                  { required: true, message: 'Por favor ingrese una fecha' },
                  { validator: validateEndDate },
                ],
              })(
                <DatePicker placeholder='' showToday={true}/>,
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

const WrappedWorkHistoryForm = Form.create()(WorkHistoryForm)
export default WrappedWorkHistoryForm