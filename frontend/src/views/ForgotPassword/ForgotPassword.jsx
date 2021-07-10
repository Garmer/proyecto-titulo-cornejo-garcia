import React from 'react'
import { Row, Col, Form, Input, message, Button } from 'antd'
import { withRouter } from "react-router-dom"
import ContainerApp from "../../components/ContainerApp"
import { userServices } from "../../services"

const ForgotPassword = ({ form, history }) => {

  const { getFieldDecorator } = form

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let body = {mail: values.mail}
        try {
          const response = await userServices.sendCode(body)
          if (response.success) {
            message.success('Te hemos enviado un correo electrónico', 10)
            history.push("/validate-code", {email: values.mail})
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
        
        <Col xs={20} md={{span: 18}} lg={12}>
          <h1 className='form-title' style={{ textAlign: 'center' }}> Recuperar contraseña </h1>
          <span className='instructions-below-label'>
            Ingrese una dirección de correo electrónico previamente registrada.
          </span>
          
          <Form>
            <Row>
              <label className="form-title-input">
                Dirección de correo electrónico
              </label>
              <Form.Item>
                {
                  getFieldDecorator('mail', {
                    rules:
                    [
                      { required: true, type:"email", message: 'Ingrese un correo electrónico' }
                    ],
                  })(
                    <Input
                      placeholder="ejemplo@gmail.com"
                    />,
                  )
                }
              </Form.Item> 
            </Row>

            <Row type="flex" justify="center">
              <Button type="primary" onClick={handleSubmit}>
                Enviar código de verificación
              </Button>
            </Row>
          </Form>
        </Col>

      </Row>
    </ContainerApp>
  )
}

const WrappedFormForgotPassword = Form.create()(ForgotPassword)
export default withRouter(WrappedFormForgotPassword)