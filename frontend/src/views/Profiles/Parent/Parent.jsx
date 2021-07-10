import React, { useState, useEffect } from 'react'
import { Row, Col , Tabs, Result, Button, Select, Icon, message, Spin} from 'antd'
import { withRouter } from "react-router-dom"
import ContainerApp from "../../../components/ContainerApp"
import ResultEmail from "../../../components/ResultEmail/ResultEmail"
import LeftContainer from '../../../components/Profiles/LeftContainer/LeftContainer'
import RightContainer from '../../../components/Profiles/RightContainer/RightContainer'
import ParentPersonalDataForm from "../../../components/Forms/PersonalDataForm/ParentPersonalDataForm"
import ChildForm from "../../../components/Forms/ChildForm"
import ChangePasswordForm from "../../../components/Forms/ChangePasswordForm/ChangePasswordForm"
import { parentServices, userServices } from "../../../services"
import ParentAppointments from "../../../components/Parent/ParentAppointments"

const Parent = ({ match }) => {

  const { Option } = Select;
  const TabPane = Tabs.TabPane;

  const [step, setStep] = useState(0)
  const [parent, setParent] = useState(null);
  const [parentId, setParentId] = useState(match.params.id);
  const [userId, setUserId] = useState(null)

  const [verificationCode, setVerificationCode] = useState(null)
  
  const [childForm, setChildForm] = useState(false);

  const openChildForm = () => {
    setChildForm(true)
  }

  //<--------- FUNCIONES VERIFICAR EMAIL --------->

  const updateParentInMemory = (parentData) => {
    setParent({...parent, parentData})
    setStep(step+1)
  }

  const changeStep = (step, parentData = null) => {
    setStep(step)
    if (parentData) {
      updateParentInMemory(parentData)
    }
  }

  const setInitialStep = (data) => {

    console.log(data)
    //Asignación de pasos faltantes
    if (data.parent.user.isMailVerified === false) {
      setStep(1)
      return
    }
    if (data.parent.child === null) {
      setStep(2)
      return
    } 
  }

  const verifyCode = async (event) => {
    try {
      let response = await userServices.verifyCode({mailVerificationCode: verificationCode, userId: userId});
      if (response.success) {
        message.success('Código verificado correctamente')
        let parentCopy = {...parent}
        parentCopy.user.isMailVerified = true
        updateParentInMemory(parentCopy)
      }
    } catch (error) {
      message.error('Código de verificación incorrecto')
    }
  }

  const handleChangeCode = (event) => {
    setVerificationCode(event.target.value)
  }

  //<---------------------------------------->

  const getParent = async () => {
    try {
      const response = await parentServices.getParentById(parentId);
      if (response.success) {
        setParent(response.data.parent)
        setUserId(response.data.parent.user.id)
        setInitialStep(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getParent()
  }, [])

  return (

    <ContainerApp>
      <Row >
        {
          ((parent) && (parent.user))
          ?
          <>
            {(step < 1) || (step > 2)
              ? 
                <>
                  <Col cx={24} lg={8} style={{ textAlign: 'center' }} className="col-right-container">
                    <LeftContainer 
                      nombre={parent.user.name + " " + parent.user.lastName}
                      emailLabel='Correo electrónico'
                      rutLabel='RUT'
                      email={parent.user.mail}
                      rut={parent.rut}
                    />
                  </Col>

                  <Col xs={24} lg={16} >
                    <RightContainer>
                      {/* Tab 'Datos Personales' */}
                      <TabPane tab="Datos" key="1">
                        <div className="tab-wrapper">
                          <Tabs type="card">
                            <TabPane tab="Datos Personales" key="1">
                              <ParentPersonalDataForm
                                userId={userId}
                                parentId={parentId}
                                name={parent.user.name}
                                lastName={parent.user.lastName}
                                mail={parent.user.mail}
                                phoneNumber={parent.phoneNumber}
                                rut={parent.rut}
                                dateOfBirth={parent.dateOfBirth}
                                profilePictureURL={parent.urlProfilePicture}
                              />
                            </TabPane>
                            
                            <TabPane tab="Datos de Niño" key="2">
                              <ChildForm
                                updateParent={getParent}
                                parentId={parentId}
                                name={parent.child ? parent.child.name : null}
                                lastName={parent.child ? parent.child.lastName: null}
                                dateOfBirth={parent.child ? parent.child.dateOfBirth : null}
                              />
                            </TabPane>
                          </Tabs>
                        </div>
                      </TabPane>

                      {/* Tab 'Citas' */}
                      <TabPane tab="Citas" key="2">
                        {/* Filtros de estados de citas a desglosar */}
                        <div className="tab-wrapper">
                          <ParentAppointments parentId={parentId}/>
                        </div>
                      </TabPane>

                      {/* Tab 'Cambiar contraseña' */}
                      <TabPane tab="Cambiar contraseña" key="3">
                        <ChangePasswordForm mail={parent.user.mail}/>
                      </TabPane>
                    </RightContainer>
                  </Col>
                </>
              : 
                <>

                {/* En caso de que el Representante no haya validado su correo */}

                {(step === 1)
                  ? <ResultEmail validate={verifyCode} handleChangeCode={handleChangeCode}/>
                  : null
                }

                {/* En caso de que el Representante no haya registrado su niño */}

                {(step === 2)
                  ? childForm
                    ? <ChildForm
                        updateParent={getParent}
                        parentId={parentId}
                        changeStep={updateParentInMemory}
                      />
                    : <Result
                        icon={<Icon type="form" />}
                        title='Ingresar datos niño'
                        subTitle='Aún no haz registrado tu niño a cargo, por favor completa el siguiente formulario con los datos correspondientes.'
                        extra={
                          <Button type="primary" onClick={openChildForm}>
                            Siguiente
                          </Button>
                        }
                      />
                  : null
                }
                </>
            }
          </>
          : <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin/>}/>  
        }
      </Row>
    </ContainerApp>
  )
}

export default withRouter(Parent)