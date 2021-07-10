import React, { useState } from 'react'
import { Form, Input, Button, message, Row, Col } from 'antd'
import { userServices } from '../../../services'

const ChangePasswordForm = ({ form, mail }) => {

  const { getFieldDecorator } = form
  const [ confirmDirty, setConfirmDirty ] = useState(null)

  const handleConfirmBlur = (event) => {
    setConfirmDirty(event.target.value)
  }

  const validateToNextPassword = (rule, value, callback) => {

    if (value && confirmDirty) {
      form.validateFields(['confirmedNewPassword'], { force: true });
    }
    callback();

  };

  const compareToFirstPassword = (rule, value, callback) => {

    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Las contraseñas no coinciden');
    } else {
      callback();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyuser = { mail: mail, oldPassword: values.oldPassword, newPassword: values.newPassword, confirmedNewPassword: values.confirmedNewPassword }
        try {
          const response = await userServices.modifyPassword(bodyuser);
          if (response.success) {
            console.log(response);
            message.success('Contraseña modificada exitosamente', 10)
            form.resetFields()
          }
        } catch(error) {
          console.log(error);
          message.error('Error al modificar su contraseña')
        }
      }
    });
  }

  return (
    <Row>
      <Col xs={{ offset: 2, span: 20 }} md={{ offset: 4, span: 16 }} lg={{ offset: 6 ,span: 12 }} >
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            <label className='form-title-input'>
              Contraseña actual
            </label>
            {getFieldDecorator('oldPassword', {
              rules: [
                { required: true, message: 'Por favor ingrese su contraseña actual' },
                { min: 8, message: 'La contraseña debe contener un mínimo de 8 carácteres' },
                { max: 15, message: 'La contraseña debe contener un máximo de 15 carácteres' },
              ],
            })(
              <Input.Password/>,
            )}
          </Form.Item>

          <Form.Item >
            <label className='form-title-input'>
              Nueva contraseña
            </label>
            {getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: 'Por favor ingrese una nueva contraseña' },
                { min: 8, message: 'La contraseña debe contener un mínimo de 8 carácteres' },
                { max: 15, message: 'La contraseña debe contener un máximo de 15 carácteres' },
                { validator: validateToNextPassword },
              ],
            })(
              <Input.Password onBlur={handleConfirmBlur}/>,
            )}
          </Form.Item>

          <Form.Item >
            <label className='form-title-input'>
              Repetir nueva contraseña
            </label>
            {getFieldDecorator('confirmedNewPassword', {
              rules: [
                { required: true, message: 'Por favor repita su nueva contraseña' },
                { min: 8, message: 'La contraseña debe contener un mínimo de 8 carácteres' },
                { max: 15, message: 'La contraseña debe contener un máximo de 15 carácteres' },
                { validator: compareToFirstPassword },
              ],
            })(
              <Input.Password onBlur={handleConfirmBlur}/>,
            )}
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              Cambiar contraseña
            </Button>
          </Form.Item>

        </Form>
      </Col>
    </Row>
      
  )
}

const WrappedChangePasswordForm = Form.create()(ChangePasswordForm)
export default WrappedChangePasswordForm