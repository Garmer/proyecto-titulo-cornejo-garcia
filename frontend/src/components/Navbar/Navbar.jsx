import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { Drawer, Button, Menu, Layout, Row, Col, Avatar, Dropdown } from 'antd'
import { authServices } from "../../services/"
import { StoreContext } from "../../context/StoreContext"

const Navbar = () => {

  const [visible, setVisible] = useState(false)
  const { actions } = useContext(StoreContext)
  const { authActions } = actions

  const { Header } = Layout

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const getUser = () => {
    //console.log(authServices.getLogedInUser())
    return authServices.getLogedInUser()
  }

  const RightMenu = ({ mode }) => {
    return (
      <Menu mode={mode} style={{ background: "#F7F8F8" }}>
        {authServices.isLoggedIn() && getUser() && getUser().psychologist ?
          <Menu.Item className="f-weight-600">
            <Link to={'/psychologist/' + getUser().psychologist.id + '/profile/private'} >
              {(getUser().psychologist.genderId === 2)
                ? "Bienvenido " 
                : "Bienvenida "
              }
              {getUser().name}
              <Avatar src={getUser().psychologist.urlProfilePicture} style={{marginLeft: '5px'}}>
              </Avatar>
            </Link>
          </Menu.Item>
        :
          null
        }
        {authServices.isLoggedIn() ?
          <Menu.Item>
            <Button className="f-weight-600 text-green-custom" onClick={authActions.logout}>Cerrar Sesión</Button>
          </Menu.Item>
        :
          null
        }
        {!authServices.isLoggedIn() ?
          <Menu.Item>
            <Link to='/login'>
              <Button className="f-weight-600 text-green-custom">Iniciar Sesión</Button>
            </Link>
          </Menu.Item>
        :
          null
        }
        {!authServices.isLoggedIn() ?
          <Menu.Item >
            <Link to='/register'>
              <Button type="primary" className="f-weight-600 ">Registrarse</Button>
            </Link>
          </Menu.Item>
        :
          null
        }
      </Menu>
    )
  }

  const LeftMenu = ({ mode }) => {
    return (
      <Menu mode={mode} style={{ background: "#F7F8F8" }}>
        {!authServices.isLoggedIn() || authServices.isLoggedIn() && getUser() && !getUser().psychologist ?
          <Menu.Item key="mail" className="f-weight-600">
            <Link to="/psicologos">Encontrar psicólogo</Link>
          </Menu.Item>
        :
          null
        }
        {!authServices.isLoggedIn() ?
          <Menu.Item key="alipay" className="f-weight-600">
            <Link to="/landing/psychologist">Soy psicólogo</Link>
          </Menu.Item>
        :
          null
        }
        {!authServices.isLoggedIn() ?
        <Menu.Item key="contact" className="f-weight-600">
          <Link to="/contact" >
            Contacto
          </Link>
        </Menu.Item>
        :
          null
        }
        {/* {authServices.isLoggedIn() && getUser() && getUser().psychologist ?
          <Menu.Item className="f-weight-600">
            <Link to={'/psychologist/' + getUser().psychologist.id + '/profile/private'} >
              Perfil
            </Link>
          </Menu.Item>
        :
          null
        } */}
        {authServices.isLoggedIn() && getUser() && getUser().parent ?
          <Menu.Item className="f-weight-600">
            <Link to={'/parent/' + getUser().parent.id + '/profile'} >
              Perfil
            </Link>
          </Menu.Item>
        :
          null
        }
      </Menu>
    )
  }

  return (
    <Row gutter={0}>
      <Col>
        <Header style={{ background: "#F7F8F8" }} className="menuBar">
          <div className="logo">
            <Link to='/'>PABSI</Link>
          </div>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu mode="horizontal" />
            </div>
            <div className="rightMenu">
              <RightMenu mode="horizontal" />
            </div>
            <Button className="barsMenu" onClick={showDrawer}>
              <span className="barsBtn"></span>
            </Button>
            <Drawer
              width="100%"
              title="Menú"
              placement="right"
              closable={true}
              onClose={onClose}
              visible={visible}
            >
              <LeftMenu mode="vertical" />
              <RightMenu mode="vertical" />
            </Drawer>
          </div>
        </Header>
      </Col>
    </Row>
  )
}
export default Navbar;