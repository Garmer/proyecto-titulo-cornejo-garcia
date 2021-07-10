import React, { useState, useContext } from 'react'
import { Row, Col, Button, Icon, Form, Input, Tabs, message} from 'antd'
import { Link, withRouter } from "react-router-dom"
import ContainerApp from "../../components/ContainerApp"
import { StoreContext } from "../../context/StoreContext"

const Login = ({ form, history, showOnlyParent, setStep }) => {


  const { getFieldDecorator } = form
  const { actions } = useContext(StoreContext)
  const { authActions } = actions
  const [ activeKey, setActiveKey ] = useState("psychologist")
  const [ loadingLogin, setLoadingLogin ] = useState(false)
  const { TabPane } = Tabs;

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyuser = {...values, role: activeKey}
        if(showOnlyParent){
          bodyuser = {...values, role: "parent"}
        }
        try {
          setLoadingLogin(true)
          const response = await authActions.login(bodyuser);
          message.success('Inicio de sesión exitoso')
          if(showOnlyParent){
            setStep(4)
          }
          else{
            redirectToProfile(response.user)
          }
          setLoadingLogin(false)
        } catch(error) {
          console.log(error)
          message.error('Credenciales ingresadas erróneas')
          setLoadingLogin(false)
        }
      }
    });
  }

  const handleChangesTab = (key) => {
    setActiveKey(key);
  }

  const redirectToProfile = (user) => {
    if (user.permission === 'parent'){
      history.push("/parent/"+user.parent.id+"/profile")
    }
    if (user.permission === 'psychologist') {
      //history.push("/psychologist/"+user.psychologist.id+"/profile/private")
      history.push("/landing/psychologist")
    }
  }

  return (
    <>
    {!showOnlyParent ?
      <ContainerApp>
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
        
          <Col className="register-card-container">
            <h1 className='form-title'>
              Iniciar sesión
            </h1>
            <Tabs type="card" onChange={handleChangesTab}>
              {/* Tab Login Psicólogo */}
              <TabPane tab="Psicólogo" key="psychologist">
                <Form className="form-box" onSubmit={handleSubmit}>
                  <label className='form-title-input'>
                    Dirección de correo electrónico
                  </label>
                  <Form.Item>
                    {getFieldDecorator('mail', {
                      rules: 
                      [
                        { required: true, type: "email", message: 'Por favor ingrese un correo electrónico'},
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
                    <p className='not-account'>
                      ¿No tienes una cuenta?
                  
                    <Link to="../register"> Registrarse</Link>
                    </p>
                  </div>
                </Form>
              </TabPane>
              {/* Tab Login Representante */}
              <TabPane tab="Representante" key="parent">
                <Form className="form-box" onSubmit={handleSubmit}>
                  <label className='form-title-input'>
                    Dirección de correo electrónico
                  </label>
                  <Form.Item>
                    {getFieldDecorator('mail', {
                      rules: 
                      [
                        { required: true, type: "email", message: 'Por favor ingrese un correo electrónico'},

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

                  <Button type="primary" htmlType="submit" className="form-button">
                    Iniciar sesión
                  </Button>
                  <div style={{ textAlign: "center", margin: "0 auto" }}>
                    <p className="login-form-forgot">
                      <Link to='../forgot-password'>¿Olvidaste tú contraseña?</Link>
                    </p>
                    <p className='not-account'>
                      ¿No tienes una cuenta?
                  
                    <Link to="../register"> Registrarse</Link>
                    </p>
                  </div>
                </Form>
              </TabPane>
            </Tabs>
          </Col>

        </Row>
      </ContainerApp>
    :
      <Form className="form-box" onSubmit={handleSubmit}>
        <label className='form-title-input'>
          Dirección de correo electrónico
        </label>
        <Form.Item>
          {getFieldDecorator('mail', {
            rules: 
            [
              { required: true, type: "email", message: 'Por favor ingrese un correo electrónico'},

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

        <Button type="primary" htmlType="submit" className="form-button">
          Iniciar sesión
        </Button>
        <div style={{ textAlign: "center", margin: "0 auto" }}>
          <p className="login-form-forgot">
            <Link to='../forgot-password'>¿Olvidaste tú contraseña?</Link>
          </p>
          <p className='not-account'>
            ¿No tienes una cuenta?
        
          <Link to="../register"> Registrarse</Link>
          </p>
        </div>
      </Form>
    }
    </>
    
    
  )
}

const WrappedNormalLoginForm = Form.create({})(Login);
export default withRouter(WrappedNormalLoginForm)