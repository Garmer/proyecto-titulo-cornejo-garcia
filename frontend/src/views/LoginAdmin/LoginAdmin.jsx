import React, { useState, useContext } from 'react'
import { Row, Col, Button, Icon, Form, Input, message} from 'antd'
import { Link, withRouter } from "react-router-dom"
import ContainerApp from "../../components/ContainerApp"
import { StoreContext } from "../../context/StoreContext"

const LoginAdmin = ({ form, history }) => {

  const { getFieldDecorator } = form
  const { actions } = useContext(StoreContext)
  const { authActions } = actions
  const [ loadingLogin, setLoadingLogin ] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyuser = {...values}
        try {
          setLoadingLogin(true)
          const response = await authActions.login({ ...bodyuser, role: "admin" });
          setLoadingLogin(false)
          setTimeout(() => {
            redirectToProfile(response.user)
          }, 1000);
          
        } catch(error) {
          console.log(error)
          message.error("Correo o contraseña incorrectos")
          setLoadingLogin(false)
        }
      }
    });
  }

  const redirectToProfile = (user) => {
    if (user.permission === 'admin'){
      history.push("/admin/dashboard")
    }
  }

  return (
    <ContainerApp>
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col className="register-card-container">
          <h1 className='form-title'>
            Iniciar sesión
          </h1>
          <Form className="form-box" onSubmit={handleSubmit}>
            <label className='form-title-input'>
              Dirección de correo electrónico
            </label>
            <Form.Item>
              {getFieldDecorator('mail', {
                rules: 
                [
                  { required: true, type: "email", message: 'Por favor ingrese un correo electrónico válido'}
                ],
              })(
                <Input
                  className='text-input'
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="ejemplo@gmail.com"
                />,
              )}
            </Form.Item>

            <label className='form-title-input'>
              Contraseña
            </label>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: 
                [
                  { required: true, message: 'Por favor ingrese una contraseña válida' },
                ],
              })
              (<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
            </Form.Item>

            <Button type="primary" htmlType="submit" className="form-button" loading={loadingLogin}>
              Iniciar sesión
            </Button>
            <div style={{ textAlign: "center", margin: "0 auto" }}>
              <p className="login-form-forgot">
                <Link to='../forgot-password'>¿Olvidaste tú contraseña?</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </ContainerApp>
  )
}

const WrappedNormalLoginAdminForm = Form.create({})(LoginAdmin);
export default withRouter(WrappedNormalLoginAdminForm)