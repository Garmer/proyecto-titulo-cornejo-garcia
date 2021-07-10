import React from 'react'
import { Row, Col } from 'antd'
import ContainerApp from "../../components/ContainerApp"

const TermsAndConditions = () => {

  return (
    <ContainerApp>
      <h1 style={{textAlign: 'center'}}>
          TÉRMINOS Y CONDICIONES DEL SITIO WEB
      </h1>
      <Row style={{margin: '40px'}}>
        <Col lg={24} style={{borderStyle: 'solid', borderWidth: '1px', textAlign: 'justify'}}>
          <p style={{margin: '10px'}}>
          La utilización de este sitio web, supone la aceptación plena y sin reservas de la totalidad de las condiciones generales de uso que se relacionan a continuación, siendo aplicables, igualmente, a la información, aplicaciones y servicios a los que se puede
          acceder a través de la misma.
          <br />
          Al ingresar al sitio web, el usuario declara ser mayor de 18 años, poseer capacidad legal para contratar y no tener ningún impedimento según los estatutos nacionales para utilizar el sitio web.
          <br />
          Los términos y condiciones podrán ser periódicamente modificados y actualizados, sin obligación de notificar particularmente al usuario.
          </p>

          <p>
          <p className= 'terms-subtitle'>
            1. Contenidos del Sitio Web
          </p>
            <div className='terms-content'>
            Ningún contenido disponible en el sitio deberá ser interpretado como opinión de salud, exceptuando las informaciones provistas directamente y de forma individual por los mismos profesionales en el libre ejercicio de sus profesiones.
            <br />
            Por lo tanto, en ningún caso la información contenida en el sitio reemplaza la atención del profesional que corresponda, para un diagnóstico o tratamiento, el que será determinado exclusivamente por dicho profesional. 
            </div>
          </p>

          <p>
          <p className= 'terms-subtitle'>
            2. Uso de la video-consulta virtual
          </p>
            <div className='terms-content'>
            JAMÁS UTILICE EL SITIO EN CASO DE EMERGENCIAS DE SALUD.
            <br />
            Si tiene una emergencia de salud diríjase a un centro de atención de urgencia de inmediato.
            <br />
            El servicio que ofrece este sitio web brinda acceso electrónico a asesorías de salud con especialistas habilitados legalmente para el ejercicio profesional, mediante una plataforma telemática a distancia.
            </div>
            </p>

          <p>
          <p className= 'terms-subtitle'>
            3. Cuenta del usuario.
          </p>
            <div className='terms-content'>
            Para tener acceso al servicio en línea que se brinda usted deberá registrarse como usuario y crear su cuenta personal, suministrando toda la información personal básica requerida.
            <br />
            Asimismo, usted se compromete a proveer información correcta, verídica y actualizada de su persona al momento de registrarse o al momento de hacer cualquier actualización de su ficha de información personal.
            <br />
            La cuenta es personal, única e instransferible, por lo que usted no deberá permitir a nadie acceder a su cuenta en su nombre y asume la responsabilidad de cualquier uso no autorizado de su cuenta por parte de terceras personas.
            <br />
            En caso de que su cuenta se vea comprometida, usted deberá notificar al sitio web de manera inmediata, sin embargo, no nos hacemos responsable del uso malicioso que se haga de la cuenta.
            </div>
          </p>
        </Col>
      </Row>
    </ContainerApp>
  )
}

export default TermsAndConditions