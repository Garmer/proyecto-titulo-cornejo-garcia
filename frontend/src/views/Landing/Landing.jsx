import React from 'react'
import AwesomeSlider from 'react-awesome-slider'
import { Row, Col, Button, Icon } from 'antd'
import ContainerApp from "../../components/ContainerApp"
import { Link } from "react-router-dom"

const Landing = () => {

  const styles = {
    iconSize: "70px",
    fontWeightTitleStep: 700,
    fontSizeDetailStep: "12px",
    marginTopTitleStep: "10px",
    colorTitleStep: "#15847D",
    paddingColDescriptions: "50px",
    heightColDescriptions: "400px",
    imageDescriptionStyle:{
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
    stylesParagraphDescriptions:{
      fontWeight: 300,
      fontSize: "16px",
      color: "white"
    },
    borderBottomColDescriptions: "1px solid white"
  }

  return (
    <ContainerApp >
      <AwesomeSlider bullets={false}>
        <div class="hero-image">
          <div class="hero-text">
            <h1 style={{ color: "white" }}>Busca el psicólogo que más se ajuste a tus necesidades y las de tu niño</h1>
            <Link to="/psicologos">
              <Button type="primary" size="large">Buscar</Button>
            </Link>
          </div>
        </div>
      </AwesomeSlider>
      <Row style={{ padding: "100px 0px"}}>
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
              type="search"
              style={{ fontSize: styles.iconSize }}
            />
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Busca psicólogo</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Busca al psicólogo que más se ajuste a lo que buscas, aplicando diferentes filtros proporcionados por la plataforma.
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
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Reserva tu cita</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Reserva la cita que te acomode según tu disponibilidad de tiempo, en simples pasos y con el psicólogo que te parezca más adecuado.
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
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Toma tu sesión online</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Conéctate desde la comodidad de tu hogar o desde un lugar con acceso a internet.
            </p>
          </div>
        </Col>
        <Col lg={4} md={24} xs={24} className="col-step-landing">
          <div className="number-step">
            5
          </div>
          <div className="icon-step-landing">
            <Icon 
              type="highlight"
              style={{ fontSize: styles.iconSize }}
            />
            <h2 style={{ fontWeight: styles.fontWeightTitleStep, marginTop: styles.marginTopTitleStep, color: styles.colorTitleStep }}>Califica tu sesión</h2>
            <p style={{ fontSize: styles.fontSizeDetailStep }}>
              Valora la experiencia con tu psicólogo, tu calificación nos ayuda a mejorar la calidad del servicio que ofrecemos.
            </p>
          </div>
        </Col>
        <Col lg={2} xs={0}>
        </Col>
      </Row>
      <Row>
        <Col className="col-description-landing">
          <Row>
            <Col lg={12} style={{ height: styles.heightColDescriptions, borderTop: styles.borderBottomColDescriptions, padding: styles.paddingColDescriptions, background:  styles.backgroundColDescriptions }}>
              <div>
                <h2 style={ styles.stylesTitleDescription }>
                  ¿Cuando considerar la psicoterapia como opción?
                </h2>
                <p style={ styles.stylesParagraphDescriptions }>
                  Algunas personas acuden a la psicoterapia porque se han sentido tristes o deprimidas, por motivos de ansiedad, por pensamientos que resultan difíciles de controlar o vivir emociones intensas e incómodas.
                </p>
                <p style={ styles.stylesParagraphDescriptions }>
                  Aunque los motivos son tan variados como personas en el mundo.    
                </p>
              </div>
            </Col>
            <Col lg={12} style={{ height: styles.heightColDescriptions, borderTop: styles.borderBottomColDescriptions }}>
              <img style={ styles.imageDescriptionStyle } src="https://image.freepik.com/vector-gratis/cerebro-salud-mental-iconos-conjunto-vectores_53876-61363.jpg" alt="MDN Logo"/>
            </Col>
          </Row>
          <Row>
            <Col lg={12} style={{ height: styles.heightColDescriptions, borderTop: styles.borderBottomColDescriptions }}>
              <img style={ styles.imageDescriptionStyle } src="https://image.freepik.com/vector-gratis/ilustracion-concepto-psicologo_114360-2141.jpg"  alt="MDN Logo"/>
            </Col>
            <Col lg={12} style={{ height: styles.heightColDescriptions, padding: styles.paddingColDescriptions, background:  styles.backgroundColDescriptions }}>
              <div>
                <h2 style={ styles.stylesTitleDescription }>
                  Su primera cita
                </h2>
                <p style={ styles.stylesParagraphDescriptions }>
                Es normal sentirse nervioso mientras se dirige a su primera cita de psicoterapia. Pero prepararse con anticipación y saber lo que puede esperar le calmará los nervios.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} style={{ height: styles.heightColDescriptions, borderTop: styles.borderBottomColDescriptions, padding: styles.paddingColDescriptions, background:  styles.backgroundColDescriptions }}>
              <div>
                <h2 style={ styles.stylesTitleDescription }>
                ¿Cuán efectiva es la psicoterapia?
                </h2>
                <p style={ styles.stylesParagraphDescriptions }>
                Algunas personas se preguntan por qué no pueden limitarse simplemente a contarles sus problemas a familiares y/o amigos. Los psicólogos son mucho más que alguien con quien desahogarse, pues tienen años de capacitación y experiencia para ayudar a las personas a mejorar sus vidas. Además, hay suficiente evidencia que demuestra que la psicoterapia es un tratamiento muy efectivo.
                </p>
              </div>
            </Col>
            <Col lg={12} style={{ height: styles.heightColDescriptions, borderTop: styles.borderBottomColDescriptions }}>
              <img style={ styles.imageDescriptionStyle } src="https://image.freepik.com/vector-gratis/ilustracion-dibujos-animados-psicologo-linea_97231-1851.jpg" alt="MDN Logo"/>
            </Col>
          </Row>
        </Col>
      </Row>
    </ContainerApp>
  )

}

export default Landing