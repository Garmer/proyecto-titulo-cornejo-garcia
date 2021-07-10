import React, { useState, useEffect } from 'react'
import { Row, Col, Tabs, Input, Table, Button, Result, Icon, Form, message, Spin} from 'antd'
import { withRouter } from "react-router-dom"
import ContainerApp from "../../../components/ContainerApp"
import { CustomSelect } from "../../../components/CustomInputs/"
import ResultEmail from "../../../components/ResultEmail/ResultEmail"
import LeftContainer from '../../../components/Profiles/LeftContainer/LeftContainer'
import RightContainer from '../../../components/Profiles/RightContainer/RightContainer'
import PsychologistPersonalDataForm from "../../../components/Forms/PersonalDataForm/PsychologistPersonalDataForm/"
import AcademicHistoryForm from "../../../components/Forms/AcademicHistoryForm"
import WorkHistoryForm from "../../../components/Forms/WorkHistoryForm"
import ChangePasswordForm from "../../../components/Forms/ChangePasswordForm/ChangePasswordForm"
import PsychologistModelForm from "../../../components/Forms/PsychologistModelForm/PsychologistModelForm"
import PsychologistRecordsForm from "../../../components/Forms/PsychologistRecordsForm/PsychologistRecordsForm"
import { psychologistServices, userServices, pathologyServices } from "../../../services/"
import PsychologistSchedule from "../../../components/Psychologist/SelectSchedule"
import PsychologistAppointments from "../../../components/Psychologist/PsychologistAppointments"


const Psychologist = ({ visible, setVisible, match, history }) => {

  const { TextArea } = Input;
  const TabPane = Tabs.TabPane;

  const [psychologist, setPsychologist] = useState(null)
  const [userId, setUserId] = useState(null)
  const [psychologistId, setPsychologistId] = useState(match.params.id);
  const [pathologiesList, setPathologiesList] = useState(null)
  
  const [step, setStep] = useState(0)
  const [modal, setModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null)
  const [modelForm, setModelForm] = useState(false);
  const [recordsForm, setRecordsForm] = useState(false);

  //<---------------------------------------->

  //<--------- FUNCIONES/MÉTODOS --------->

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const openModelForm = () => {
    setModelForm(true)
  }

  const openRecordsForm = () => {
    setRecordsForm(true)
  }

  const updatePsychologistInMemory = (psychologistData) => {
    setPsychologist({...psychologist, psychologistData})
    setStep(step+1)
  }

  const changeStep = (step, psychologistData = null) => {
    setStep(step)
    if (psychologistData) {
      updatePsychologistInMemory(psychologistData)
    }
  }

  const setInitialStep = (data) => {

    //Asignación de pasos faltantes
    if (data.psychologist.user.isMailVerified === false) {
      setStep(1)
      return
    }
    if ((data.psychologist.isVerified === false) && (data.psychologist.verificationInProcess === false)) {
      setStep(2)
      return
    } 
    if (data.psychologist.verificationInProcess === true) {
      setStep(3)
      return
    }
    if ((data.psychologist.workModel === null) && (data.psychologist.pathologies && data.psychologist.pathologies.length === 0)){
      setStep(4)
      return
    } 
  }

  const verifyCode = async (event) => {
    try {
      let response = await userServices.verifyCode({mailVerificationCode: verificationCode, userId: userId});
      if (response.success) {
        message.success('Código verificado correctamente')
        let psychologistCopy = {...psychologist}
        psychologistCopy.user.isMailVerified = true
        updatePsychologistInMemory(psychologistCopy)
      }
    } catch (error) {
      message.error('Código de verificación incorrecto')
    }
  }

  const handleChangeCode = (event) => {
    setVerificationCode(event.target.value)
  }

  //<---------------------------------------->


  const getPsychologist = async () => {
    try {
      const response = await psychologistServices.getPsychologistById(psychologistId);
      if (response.success) {
        setPsychologist(response.data.psychologist)
        setUserId(response.data.psychologist.user.id)
        setInitialStep(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadPathologies = async () => {
    try {
      const response = await pathologyServices.getPathology();
      if (response.success) {
        setPathologiesList(response.data.pathologies)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPsychologist()
    loadPathologies()
  }, [])

  return (
    
    <ContainerApp>
      <Row type="flex" justify="center">
        {
          ((psychologist) && (psychologist.user))
          ? 
          <>
            {/* Se valida si el psicólogo ha rellenado la información obligatoria para posteriormente poder revisar su perfil (privado) */}
            {(step < 1) || (step > 4)
              ? <> 
              <Col xs={24} sm={24} lg={8} style={{ textAlign: 'center' }} className="col-right-container">
                <LeftContainer
                  imageURL={psychologist.urlProfilePicture}
                  nombre={psychologist.user.name + " " + psychologist.user.lastName}
                  emailLabel='Correo electrónico'
                  rutLabel='RUT'
                  email={psychologist.user.mail}
                  rut={psychologist.rut}
                />
              </Col>

              <Col xs={24} sm={24} lg={16} >
                <RightContainer>
                  {/* Tab 'Datos Personales' */}
                  <TabPane tab="Datos" key="1">
                    <div className="tab-wrapper">
                      <Tabs type="card">
                        <TabPane tab="Datos Personales" key="1">
                          <PsychologistPersonalDataForm
                            userId={userId}
                            psychologistId= {psychologistId}
                            profilePictureURL={psychologist.urlProfilePicture}
                            name={psychologist.user.name}
                            lastName={psychologist.user.lastName}
                            mail={psychologist.user.mail}
                            psychologistPathologies={psychologist.pathologies}
                            pathologies={pathologiesList}
                            description={psychologist.description}
                          />
                        </TabPane>
                        <TabPane tab="Datos Acádemicos" key="2">
                          {((psychologist.academicHistories) && (psychologist.academicHistories.length > 0))
                            ?
                              <AcademicHistoryForm
                                psychologistId={psychologist.id}
                                degree={psychologist.academicHistories[0].degree}
                                specialty={psychologist.academicHistories[0].specialty}
                                college={psychologist.academicHistories[0].college}
                              />
                            : null
                          }
                        </TabPane>
                        <TabPane tab="Datos Profesionales" key="3">
                          {((psychologist.workHistories) && (psychologist.workHistories.length > 0))
                            ? 
                              <WorkHistoryForm
                                psychologistId={psychologist.id}
                                position={psychologist.workHistories[0].position}
                                company={psychologist.workHistories[0].company}
                                descriptionOfActivity={psychologist.workHistories[0].descriptionOfActivity}
                                startDate={psychologist.workHistories[0].startDate}
                                endDate={psychologist.workHistories[0].endDate}
                              />
                            : null
                          }
                        </TabPane>
                      </Tabs>
                    </div>
                  </TabPane>

                  {/* Tab 'Citas' */}
                  <TabPane tab="Citas" key="2">
                    <div className="tab-wrapper">
                      <PsychologistAppointments psychologistId={psychologistId} />
                    </div>
                  </TabPane>

                  {/* Tab 'Horarios' */}
                  <TabPane tab="Horarios" key="3">
                    <PsychologistSchedule />
                  </TabPane>

                  {/* Tab 'Cambiar Contraseña' */}
                  <TabPane tab="Cambiar contraseña" key="4">
                    <ChangePasswordForm mail={psychologist.user.mail}/>
                  </TabPane>
                </RightContainer>
              </Col>
            </>

            /* En caso contrario, se renderizarán los componentes dependiendo de la información faltante */
            : <>
              {(step === 1)
                ? <ResultEmail validate={verifyCode} handleChangeCode={handleChangeCode}/>
                : null
              }

              {(step === 2)
                ? 
                  <>
                  {(psychologist.verificationInProcess === false)
                    ? recordsForm
                      ? <PsychologistRecordsForm psychologist={psychologist} changeStep={updatePsychologistInMemory}/>
                      : <Result
                          icon={<Icon type="form" />}
                          title='Verificar información laboral y académica'
                          subTitle='Aún no hemos verificado tus experiencias laborales y académicas, por favor completa el siguiente formulario con los datos correspondientes.'
                          extra=
                        {
                        <Button type="primary" onClick={openRecordsForm}>
                          Siguiente
                        </Button>
                        }
                        /> 
                    : null
                  }
                  </>
                : 
              
                (step === 3)
                ? <Result
                    status="warning"
                    title='Antecedentes en evaluación'
                    subTitle='Nuestros administradores están revisando tus antecedentes enviados anteriormente, por favor regrese más tarde.'
                  />
                : null
              }

              {(step === 4)
                ? modelForm
                  ? <PsychologistModelForm psychologistId={psychologistId} changeStep={updatePsychologistInMemory}/>
                  : <Result
                      icon={<Icon type="form" />}
                      title='Agregar áreas de atención y modelo terapéutico'
                      subTitle='Aún no haz específicado como te desenvuelves en tu ambiente laboral, por favor describelos a través del siguiente formulario.'
                      extra=
                    {
                    <Button type="primary" onClick={openModelForm}>
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

export default withRouter(Psychologist)