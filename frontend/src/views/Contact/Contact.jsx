import React, { useEffect } from 'react'
import { Row, Col, message, notification } from 'antd'
import ContainerApp from "../../components/ContainerApp"
import { ContactForm } from "../../components/Forms/ContactForm"
import { contactServices } from '../../services'

const Contact = () => {

  const sendContactMessage = async (body) => {
    try {
      const response = await contactServices.sendMessage(body)
      if(response.success){
        notification.success({
          message: "Mensaje enviado",
          description: "Te contactaremos lo antes posible",
          placement: "bottomLeft"
        })
      }
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Mensaje no fué enviado",
        description: "Ocurrió un error, intente nuevamente más tarde",
        placement: "bottomLeft"
      })
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <ContainerApp style={{ padding: "0 20px", marginLeft: "10px", marginTop: "20px" }} >
      <Row>
        <Col xs={24} md={{ span: 18, offset: 3 }} lg={{ span: 12 , offset: 6 }}>
          <h1>
            Contacto
          </h1>
          <h3 style={{ marginBottom: "14px" }}>
            Envíanos tu mensaje y te responderemos lo antes posible!
          </h3>
        </Col>
        <Col xs={24} md={{ span: 18, offset: 3 }} lg={{ span: 12 , offset: 6 }}>
          <ContactForm sendContactMessage={sendContactMessage} />
        </Col>
      </Row>
    </ContainerApp>
  )

}

export default Contact