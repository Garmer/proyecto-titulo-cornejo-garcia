import React, { useState } from 'react'
import { Row, Col, Button, Form, Input, DatePicker, message } from 'antd'
import { parentServices } from '../../../services'
import moment from 'moment'

const ChildForm = ({ form, parentId, name, lastName, dateOfBirth, changeStep, updateParent }) => {

  const { getFieldDecorator, setFieldsValue } = form

  const validateAge = (rule, value, callback) => {
    let fechaActual = new Date();
    let cumpleanos = new Date(value);
    let edad = fechaActual.getFullYear() - cumpleanos.getFullYear();
    var mes = fechaActual.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    if (edad <= 18) {
      callback();
    } else {
      callback('Registro no permitido para adultos');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let body = {name: values.name, lastName: values.lastName, dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD')}
        try {
          const responseChild = await parentServices.modifyChildData(parentId, body)
          if (responseChild.success) {
            console.log(responseChild)
            message.success('Datos del niño guardados exitosamente')
            updateParent()
            if(changeStep){
              changeStep()
            }
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
        
        <Row type="flex" justify="center" gutter={24} style={{marginLeft: '20px', marginRight: '20px'}}>
          <Col>
            <Form.Item>
              <label className='form-title-input'>
                Nombre
              </label>
              {
                getFieldDecorator('name', {
                  initialValue: 
                    name
                  ,
                  rules: 
                  [
                    { required: true, message: 'Ingrese un nombre'},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }  
            </Form.Item>
          </Col>

          <Col>
            <Form.Item>
              <label className='form-title-input'>
                Apellido
              </label>
              {
                getFieldDecorator('lastName', {
                  initialValue: 
                    lastName
                  ,
                  rules: 
                  [
                    { required: true, message: 'Ingrese un apellido'},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }
            </Form.Item>
          </Col>

        </Row>
        <Row type="flex" justify="center">

          <Form.Item>
            <label className='form-title-input'>
              Fecha de Nacimiento
            </label>
            {
              getFieldDecorator('dateOfBirth', {
                initialValue: dateOfBirth ? moment(dateOfBirth) : null,
                rules: 
                [
                  { required: true, message: 'Seleccione una fecha válida' },
                  { validator: validateAge },
                ],
              })(
              <DatePicker placeholder='' showToday={true}/>
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

const WrappedChildForm = Form.create()(ChildForm)
export default WrappedChildForm