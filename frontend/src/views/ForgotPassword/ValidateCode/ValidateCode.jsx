import React, { useState } from 'react'
import { Row, Col, Form, Input, message, Button } from 'antd'
import ContainerApp from "../../../components/ContainerApp"
import { withRouter, useLocation } from "react-router-dom"
import { userServices } from "../../../services"

const ValidateCode = ({ form, history }) => {

  const { getFieldDecorator } = form
  const [ confirmDirty, setConfirmDirty ] = useState(null)
  const location = useLocation()

  /* <----------Funciones encargadas de validar las contraseñas----------> */

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
      callback('Las dos contraseñas ingresadas no coinciden');
    } else {
      callback();
    }
  };

  /* <----------------------------------------------------------------------> */

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let body = {mail: location.state.email, newPassword: values.newPassword, confirmedNewPassword: values.confirmedNewPassword, code: values.code}
        try {
          const response = await userServices.recoverPassword(body)
          if (response.success) {
            message.success('Contraseña modificada exitosamente', 10)
            history.push("/login")
          }
        } catch (error) {
          message.error('Ocurrió un error, intentalo nuevamente')
          console.log(error)
        }
      }
    });
  }

  return (
    <ContainerApp>
      <Row type="flex" justify="center">
        <Col span={12}>
          <h1 className='form-title'> Recuperar contraseña </h1>
          <span className='instructions-below-label'>
            Revisa tu bandeja de entrada o en correos no deseados, te enviaremos un correo electrónico con un código de verificación.
          </span>

          <Form onSubmit={handleSubmit}>
            <Row>
              <label className="form-title-input">
                Código de verificación
              </label>
              <Form.Item>
              {
                getFieldDecorator('code' , {
                  rules:
                  [
                    { required: true, message: 'Ingresa el código de verificación' },
                  ],
                })(
                  <Input maxLength={6}></Input>,
                )
              }
              </Form.Item>
              
              <label className="form-title-input">
                Nueva contraseña
              </label>
              <Form.Item hasFeedback>
              {
                getFieldDecorator('newPassword' , {
                  rules:
                  [
                    { required: true, message: 'Ingresa tu nueva contraseña' },
                    { min: 8, message: 'La contraseña debe contener un mínimo de 8 carácteres' },
                    { max: 15, message: 'La contraseña debe contener un máximo de 15 carácteres' },
                    { validator: validateToNextPassword },
                  ],
                })(
                  <Input.Password/>
                )
              }
              </Form.Item>

              <label className="form-title-input">
                Confirmar nueva contraseña
              </label>
              <Form.Item hasFeedback>
              {
                getFieldDecorator('confirmedNewPassword' , {
                  rules:
                  [
                    { required: true, message: 'Repita su nueva contraseña' },
                    { validator: compareToFirstPassword },
                  ],
                })(
                  <Input.Password onBlur={handleConfirmBlur}/>
                )
              }
              </Form.Item>
            </Row>
            <Row>
              <Button type="primary" htmlType="submit">
                Cambiar contraseña
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </ContainerApp>
  )
}

const WrappedValidateCodeForm = Form.create({})(ValidateCode)
export default withRouter(WrappedValidateCodeForm)