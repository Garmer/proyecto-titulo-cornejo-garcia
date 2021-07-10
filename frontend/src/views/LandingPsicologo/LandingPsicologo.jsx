import React from 'react'
import AwesomeSlider from 'react-awesome-slider'
import { Row, Col, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import ContainerApp from "../../components/ContainerApp"

const LandingPsicologo = () => {

  const styles = {
    iconSize: "70px",
    fontWeightTitleStep: 700,
    fontSizeDetailStep: "12px",
    marginTopTitleStep: "10px",
    colorTitleStep: "#15847D",
    paddingColDescriptions: "50px",
    heightColDescriptions: "400px",
    imageDescriptionStyle: {
      objectFit: "cover",
      height: "400px",
      width: "100%",
    },
    backgroundColDescriptions: "rgb(120 185 179 / 1)",
    stylesTitleDescription: {
      color: "white",
      fontWeight: 600,
      fontSize: "25px"
    },
    stylesParagraphDescriptions: {
      fontWeight: 300,
      fontSize: "16px",
      color: "white"
    },
    borderBottomColDescriptions: "1px solid white"
  }

  return (
    <ContainerApp >
      <Row>
        <AwesomeSlider organicArrows={false} bullets={false}>
          <div class='hero-image' style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://dz9yg0snnohlc.cloudfront.net/can-i-find-a-child-psychologist-near-me-1.jpg)" }}>
            <div class="hero-text">
              <h1 style={{ color: "white" }}>Comienza creando tu cuenta como psicólogo</h1>
              <p></p>
              <Button type="primary" size="large"><Link to="/register">Registrarse</Link></Button>
            </div>
          </div>
        </AwesomeSlider>
      </Row>
      <Row type="flex" justify="center" align="middle" style={{ padding: "100px 0px" }}>
        <Col lg={2} xs={0}>
        </Col>
        <Col lg={4} md={12} xs={24} className="col-step-landing">
          <div className="number-step">
            1
          </div>
          <div className="icon-step-landing">
            <Icon
              type="enter"
              style={{ fontSize: styles.iconSize }}
            />
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Regístrate</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Regístrate de forma fácil y sencilla.
              Tus datos serán almacenados de forma privada para que cada vez que lo necesites, ingreses a nuestro portal con tu usuario y contraseña.
            </p>
          </div>
        </Col>
        <Col lg={4} md={12} xs={24} className="col-step-landing">
          <div className="number-step">
            2
          </div>
          <div className="icon-step-landing">
            <Icon
              type="file-protect"
              style={{ fontSize: styles.iconSize }}
            />
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Verifica tus antecedentes</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Si buscas ofrecer tus servicios como psicólogo, no lo dudes y
              valida tus antecedentes profesionales y académicos.
            </p>
          </div>
        </Col>
        <Col lg={4} md={12} xs={24} className="col-step-landing">
          <div className="number-step">
            3
          </div>
          <div className="icon-step-landing">
            <Icon
              type="calendar"
              style={{ fontSize: styles.iconSize }}
            />
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Selecciona tu horario</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Selecciona los horarios que más te acomoden para la atención de pacientes.
            </p>
          </div>
        </Col>
        <Col lg={4} md={12} xs={24} className="col-step-landing">
          <div className="number-step">
            4
          </div>
          <div className="icon-step-landing">
            <Icon
              type="laptop"
              style={{ fontSize: styles.iconSize }}
            />
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Atiende pacientes</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Conéctate desde la comodidad de tu hogar o desde un lugar con acceso a internet.
            </p>
          </div>
        </Col>
        <Col lg={2} xs={0}>
        </Col>
      </Row>
    </ContainerApp>
  )

}

export default LandingPsicologo