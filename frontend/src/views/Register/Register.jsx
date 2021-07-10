import React from 'react'
import { Row, Col, Form, Tabs } from 'antd'
import ContainerApp from "../../components/ContainerApp"
import { RegisterParentForm } from "../../components/Forms/RegisterParentForm"
import { RegisterPsychologistForm } from "../../components/Forms/RegisterPsychologistForm"

const Register = () => {

  const { TabPane } = Tabs;

  return (
    
    <ContainerApp>
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
        {/* TabBar */}
        <div className="register-card-container">
          <Tabs type="card">
            {/* <----------------------TAB 'SOY PSICÓLOGO'----------------------> */}
            <TabPane tab="Soy Psicólogo" key="1">
              <Col className="column-form">
                <RegisterPsychologistForm/>
              </Col>
            </TabPane>
            {/* <-----------------------------------------------------------------> */}

            {/* <----------------------TAB 'BUSCO PSICÓLOGO'----------------------> */}

            <TabPane tab="Busco Psicólogo" key="2">
              <Col className="column-form">
                <RegisterParentForm/>
              </Col>
            </TabPane>
            {/* <-----------------------------------------------------------------> */}
          </Tabs>
        </div>
      </Row>
    </ContainerApp>
  )
}

const WrappedNormalRegisterForm = Form.create()(Register);
export default WrappedNormalRegisterForm