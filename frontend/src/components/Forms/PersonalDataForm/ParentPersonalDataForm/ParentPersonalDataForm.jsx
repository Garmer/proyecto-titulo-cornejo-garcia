import React, { useState } from 'react'
import { Row, Col, Avatar, Button, Upload , Form, Input, Select, message } from 'antd'
import { parentServices, userServices, uploadServices } from '../../../../services'

const ParentPersonalDataForm = ({ form, profilePictureURL, name, lastName, mail, phoneNumber, userId, parentId }) => {

  const { getFieldDecorator, setFieldsValue } = form

  const { Option } = Select;
  
  const codigoNumerico = getFieldDecorator('prefix', {
    initialValue: '+569',
  })(
    <Select style={{ width: 85 }}>
      <Option value="+569">+569</Option>
      <Option value="+549">+549</Option>
      <Option value="+519">+519</Option>
    </Select>,
  );

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyUser = {name: values.name, lastName: values.lastName, mail: values.mail}
        let bodyParent = {phoneNumber: values.phoneNumber}
        try {
          const responseUser = await userServices.modifyData(userId, bodyUser);
          const responseParent = await parentServices.modifyPhoneNumber(parentId, bodyParent);
          message.success("datos guardados")
          console.log(responseUser);
          console.log(responseParent);
        } catch(error) {
          message.error("ocurrió un error, intentalo nuevamente")
          console.log(error);
        }
      }
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Row gutter={24} style={{marginLeft: '20px', marginRight: '20px'}}>
          {/* Primera columna de datos personales */}
          <Col span={12}>
            <Form.Item>
              <label className='form-title-input'>
                Nombre
              </label>
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: 
                  [
                    { required: false, message: 'Ingrese un nuevo nombre'},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }  
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Correo electrónico
              </label>
              {
                getFieldDecorator('mail', {
                  initialValue: mail,
                  rules: 
                  [
                    { required: false, message: 'Ingrese una nueva dirección de correo electrónico '},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }  
            </Form.Item>
          </Col>

          {/* Segunda columna de datos personales */}
          <Col span={12}>
            <Form.Item>
              <label className='form-title-input'>
                Apellido
              </label>
              {
                getFieldDecorator('lastName', {
                  initialValue: lastName,
                  rules: 
                  [
                    { required: false, message: 'Ingrese un nuevo apellido'},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Teléfono
              </label>
              {
                getFieldDecorator('phoneNumber', {
                  initialValue: phoneNumber,
                  rules: 
                  [
                    { required: false, message: 'Por favor agregue una número de teléfono'},
                  ],
                })(
                  <Input addonBefore={codigoNumerico} style={{ width: '100%' }}/>,
                )
              }
            </Form.Item>

          </Col>
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

const WrappedParentPersonalDataForm = Form.create()(ParentPersonalDataForm)
export default WrappedParentPersonalDataForm