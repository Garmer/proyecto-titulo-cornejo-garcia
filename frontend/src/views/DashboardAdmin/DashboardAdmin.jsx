import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Button, Icon, Layout, Modal, message } from 'antd'
import moment from 'moment'
import ContainerApp from "../../components/ContainerApp/"
import { CustomSelect } from "../../components/CustomInputs/"
import DataContainer from "../../components/DataContainer/DataContainer"
import Sider from "../../components/Sider/Sider"
import { psychologistServices, parentServices, adminServices } from "../../services"

const DashboardAdmin = ({ match }) => {

  const [render, updateRender] = useState(1);
  const [modalVerify, setModalVerify] = useState(false);
  const { Content } = Layout;

  const [parent, setParent] = useState(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null) 
  const [unverifiedPsychologists, setUnverifiedPsychologists] = useState(null)

  /*<---------- Tabla Psicólogos ---------->*/

  const columnasPsicologos = [
    {
      key: 'name',
      title: 'Nombre Psicólogo',
      dataIndex: 'name',
    },
    {
      key: 'lastName',
      title: 'Apellido Psicólogo',
      dataIndex: 'lastName',
    },
    {
      key: 'degree',
      title: 'Título',
      dataIndex: 'degree',
    },
    {
      key: 'rut',
      title: 'RUT',
      dataIndex: 'rut',
    },
  ];

  const dataPsicologos = [
    {
      key: '1',
      name: 'Juan',
      lastName: 'Cornejo',
      degree: 'Licenciatura en psicología',
      rut: '15.331.478-0',
    },
    {
      key: '2',
      name: 'Pedro',
      lastName: 'García',
      degree: 'Licenciatura en psicología',
      rut: '11.285.098-8',
    },
    {
      key: '3',
      name: 'Mónica',
      lastName: 'Vargas',
      degree: 'Licenciatura en psicología',
      rut: '11.248.089-3',
    },
  ];
  /*<---------------------------------------->*/

  /*<---------- Tabla Representantes ---------->*/

  const columnsParents = [
    {
      key: 'name',
      title: 'Nombre Representante',
      dataIndex: 'name',
    },
    {
      key: 'lastName',
      title: 'Apellido Representante',
      dataIndex: 'lastName',
    },
    {
      key: 'mail',
      title: 'Dirección de correo electrónico',
      dataIndex: 'mail',
    },
    {
      key: 'rut',
      title: 'RUT',
      dataIndex: 'rut',
    },
  ];

  const dataRepresentantes = [
    {
      key: '1',
      name: 'Matías',
      lastName: 'Zapata',
      mail: 'matizxd_90@gmail.com',
      rut: '11.298.478-4',
    },
    {
      key: '2',
      name: 'Maximiliano',
      lastName: 'Rojas',
      mail: 'm_rojas_1994@gmail.com',
      rut: '19.441.032-7',
    },
    {
      key: '3',
      name: 'Javier',
      lastName: 'Tapia',
      mail: 'javiitap11@hotmail.com',
      rut: '18.347.841-0',
    },
  ];

  /*<---------------------------------------->*/

  /* <---------- Tabla Citas ----------> */

  const columnasCitas = [
    {
      key: 'nombrePsicologo',
      title: 'Nombre Psicólogo',
      dataIndex: 'nombrePsicologo',
    },
    {
      key: 'nombreRepresentante',
      title: 'Nombre Representante',
      dataIndex: 'nombreRepresentante',
    },
    {
      key: 'estado',
      title: 'Estado',
      dataIndex: 'estado',
    },
  ];

  const dataCitas = [
    {
      key: '1',
      nombrePsicologo: 'Elías Figueroa',
      nombreRepresentante: 'Josefa Mora',
      estado: 'Pendiente',
    },
    {
      key: '2',
      nombrePsicologo: 'Ariel Palma',
      nombreRepresentante: 'Mauricio Torres',
      estado: 'Finalizada',
    },
    {
      key: '3',
      nombrePsicologo: 'Christopher Bravo',
      nombreRepresentante: 'Gonzalo Zuñiga',
      estado: 'Cancelada',
    },
  ];

  /*<---------------------------------------->*/

  /* <---------- Tabla Quejas ----------> */

  const columnasQuejas = [
    {
      key: 'nombrePsicologo',
      title: 'Nombre Psicólogo',
      dataIndex: 'nombrePsicologo',
    },
    {
      key: 'nombreRepresentante',
      title: 'Nombre Representante',
      dataIndex: 'nombreRepresentante',
    },
    {
      key: 'comentario',
      title: 'Comentario',
      dataIndex: 'comentario',
    },
    {
      key: 'detalles',
      title: 'Detalles',
      render: () => (
      <>
        <Button onClick={openModal}>
          <Icon type='file-search' />
        </Button>
        <Modal
        title="Detalles Queja"
        visible={modalVerify}
        onCancel={closeModal}
        footer={null}>

          <Row>
            <p>
              <span style={{color: '#15847D', fontWeight: 'bold'}}>
                Representante: 
              </span>
              <span style={{fontWeight: 'bold'}}>
                Rodrigo Valenzuela
              </span>
            </p>
            <p>
              <span style={{color: '#15847D', fontWeight: 'bold'}}>
                Psicólogo:
              </span>
              <span style={{fontWeight: 'bold'}}>
                Juan Cornejo
              </span>
            </p>
          </Row>

          <Col  style={{borderStyle: 'solid', borderRadius: '20px', height: '200px'}}>
            <span style={{textAlign: 'justify', margin: '10px', display: 'block'}}>
              Psicólogo no se presenta a la hora estipulada, actitud informal y poco profesional.
            </span>
          </Col>

        </Modal>
      </>
      ),
    },
  ];

  const dataQuejas = [
    {
      key: '1',
      nombrePsicologo: 'Juan Cornejo',
      nombreRepresentante: 'Rodrigo Valenzuela',
      comentario: 'Psicólogo no es puntual',
    },
    {
      key: '2',
      nombrePsicologo: 'Pedro García',
      nombreRepresentante: 'Maximiliano Rojas',
      comentario: 'Mala atención',
    },
    {
      key: '3',
      nombrePsicologo: 'Mónica Vargas',
      nombreRepresentante: 'Javier Tapia',
      comentario: 'Psicólogo impuntual',
    },
  ];

  /* <---------- Tabla Psicólogos a Verificar ----------> */

  const columnsPsychologistsToVerify = [
    {
      title: 'Nombre',
      dataIndex: 'user',
      key: 'id',
      render: (text, data) => {
        if(text){
          return (
            <span>
              {text.name + " " + text.lastName}
            </span>
          )
        }
        else{
          return null
        }
      }
    },
    {
      title: 'Título académico',
      dataIndex: 'academicHistories',
      key: 'degree',
      render: (text, data) => {
        if(text && text.length > 0){
          return (
            <span>
              {text[0].degree}
            </span>
          )
        }
        else{
          return null
        }
      }
    },
    {
      title: 'RUT',
      dataIndex: 'rut',
      key: 'rut',
    },
    {
      title: 'Fecha de Registro',
      dataIndex: 'user.createdAt',
      key: 'user.createdAt',
      render: (text, data) => {
        if(text){
          return (
            <span>
              {moment(text).utcOffset("-04:00").format("DD-MM-YYYY")}
            </span>
          )
        }
        else{
          return null
        }
        
      }
    },
    {
      title: 'Detalles',
      key: 'detalles',
      render: (text, data) => (
      <>
        <Button onClick={() => { openModal(data) }}>
          <Icon type='file-search' />
        </Button>
        <Modal
        title={
          <span style={{ textTransform: "capitalize" }}>
            {selectedPsychologist && selectedPsychologist.user ? `${selectedPsychologist.user.name} ${selectedPsychologist.user.lastName}` : null}
          </span>
        }
        visible={modalVerify}
        onCancel={closeModal}
        width={800}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={verifyPsychologist}>
            Verificar
          </Button>,
          <Button key="back"  size="large" onClick={closeModal}>
            Cancelar
          </Button>,
        ]}>
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Col>
                <h2>
                  Formación académica principal
                </h2>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Título
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasAcademicHistories(selectedPsychologist) ?
                    selectedPsychologist.academicHistories[0].degree
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <span style={{fontWeight: 'bold', display: 'block'}}>
                  Áreas de especialidad
                </span>
                <span style={{ display: 'block'}}>
                  { hasAcademicHistories(selectedPsychologist) ?
                    selectedPsychologist.academicHistories[0].specialty
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Insitución de educación superior
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasAcademicHistories(selectedPsychologist) ?
                    selectedPsychologist.academicHistories[0].college
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Certificado de título
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasAcademicHistories(selectedPsychologist) ?
                    <>
                      <a href={selectedPsychologist.academicHistories[0].urlDegreeCertificate} target="_blank">
                        <span>Certificado de título</span>
                        <Icon type="arrow-down" style={{ marginLeft: 5 }} />
                      </a>
                      
                    </>
                  :
                    null
                  }
                </span>
              </Col>
              
            </Col>
              
            <Col xs={24} lg={12} className="col-work-history-admin">
              <Col className="title-work-history-admin">
                <h2>
                  Experiencia laborar más reciente
                </h2>
              </Col>
            
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Posición o puesto
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasWorkHistories(selectedPsychologist) ?
                    selectedPsychologist.workHistories[0].position
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Empresa o lugar
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasWorkHistories(selectedPsychologist) ?
                    selectedPsychologist.workHistories[0].company
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Descripción de actividades
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasWorkHistories(selectedPsychologist) ?
                    selectedPsychologist.workHistories[0].descriptionOfActivity
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Fecha inicio
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasWorkHistories(selectedPsychologist) ?
                    selectedPsychologist.workHistories[0].startDate
                  :
                    null
                  }
                </span>
              </Col>
              <Col style={{ marginBottom: 10 }}>
                <div style={{display: 'block'}}>
                  <span style={{fontWeight: 'bold'}}>
                    Fecha término
                  </span>
                </div>
                <span style={{ display: 'block'}}>
                  { hasWorkHistories(selectedPsychologist) ?
                    selectedPsychologist.workHistories[0].endDate === null ?
                    "Actualidad"
                    :
                    selectedPsychologist.workHistories[0].endDate
                  :
                    null
                  }
                </span>
              </Col>
              
            </Col>
          </Row>
        </Modal>
      </>
      ),
    },
  ];

  const dataPsicologosVerificar = [
    {
      key: '1',
      name: 'Juan',
      lastName: 'Cornejo',
      degree: 'Licenciatura en psicología',
      rut: '15.331.478-0',
      fecha: '15-05-21',
      modelo: 'Humanista',
    },
    {
      key: '2',
      name: 'Pedro',
      lastName: 'García',
      degree: 'Licenciatura en psicología',
      rut: '11.258.098-8',
      fecha: '22-04-21',
      modelo: 'Humanista',
    },
    {
      key: '3',
      name: 'Mónica',
      lastName: 'Vargas',
      degree: 'Maestría en psicología clínica',
      rut: '11.248.089-3',
      fecha: '09-02-21',
      modelo: 'Humanista',
    },
  ];

  /*<---------------------------------------->*/

  /*<----------Funciones---------->*/

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  const openModal = (psychologist) => {
    setModalVerify(true);
    setSelectedPsychologist(psychologist)
  }

  const closeModal = () => {
    setModalVerify(false);
    setSelectedPsychologist(null)
  }

  const hasAcademicHistories = (psychologist) => {
    return psychologist && psychologist.academicHistories && psychologist.academicHistories.length > 0
  }

  const hasWorkHistories = (psychologist) => {
    return psychologist && psychologist.workHistories && psychologist.workHistories.length > 0
  }

  const getUnverifiedPsychologists = async () => {
    try {
      //const response = await psychologistServices.getPsychologistById();
      const response = await psychologistServices.getAllUnverifiedPsychologists()
      if (response.success) {
        setUnverifiedPsychologists(response.data.psychologists)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getParents = async () => {
    try {
      //const response = await parentServices.getParentById();
      const response = await adminServices.getParents();
      if (response.success) {
        setParent(response.data.parent)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const verifyPsychologist = async () => {
    if(selectedPsychologist){
      try {
        const response = await psychologistServices.verifyPsychologist(selectedPsychologist.id, {
          verificationInProcess: false,
          isVerified: true
        })

        if(response.success){
          message.success("Psicologo verificado")
          getUnverifiedPsychologists()
          closeModal()
        }
      } catch (error) {
        console.log(error)
        message.error("Ocurrió un error, intentalo más tarde")
      }
    }
  }

  useEffect(() => {
    handleMenuClick({key: "4"})
    getUnverifiedPsychologists()
    // getParents()
  }, [])

  /*<---------------------------------------->*/

  const components = {
    1: <div style={{}}>
        <Row gutter={48} type='flex' justify='center'>
          <Col>
            <DataContainer 
              description='Cantidad de citas realizadas (hoy)' 
              value='11'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad de citas realizadas (mes)' 
              value='44'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad de citas realizadas (año)' 
              value='123'
            />
          </Col>
        </Row>
        <Row gutter={48} type='flex' justify='center'>
          <Col>
            <DataContainer 
              description='Cantidad total de quejas' 
              value='9'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad de comentarios' 
              value='7'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad total de citas canceladas' 
              value='15'
            />
          </Col>
        </Row>
        
        {/* Tabla de Citas */}
        <Row>
          <span style={{fontWeight: 'bold', fontSize: '28px', color: '#15847D'}}>
            Tabla de Citas
          </span>
          <Table bordered dataSource={dataCitas} columns={columnasCitas} />
        </Row>

        {/* Tabla de Quejas */}
        <Row>
          <span style={{fontWeight: 'bold', fontSize: '28px', color: '#15847D'}}>
            Tabla de Quejas
          </span>
          <Table bordered dataSource={dataQuejas} columns={columnasQuejas} />
        </Row>
      </div>,
    2: <div style={{}}>
        <Row gutter={48} type='flex' justify='center'>
          <Col>
            <DataContainer 
              description='Cantidad de Representantes registrados' 
              value='44'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad de Representantes con citas'
              value='40'
            />
          </Col>
        </Row>
        
        {/* Tabla de Representantes */}
        <Row>
          <Table 
            bordered 
            dataSource={dataRepresentantes} 
            columns={columnsParents} 
          />
        </Row>
      </div>,
    3: <div style={{}}>
        <Row gutter={48} type='flex' justify='center'>
          <Col>
            <DataContainer 
              description='Cantidad de Psicólogos registrados' 
              value='31'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad de Psicólogos verificados' 
              value='57'
            />
          </Col>
          <Col>
            <DataContainer 
              description='Cantidad de Psicólogos con citas' 
              value='40'
            />
          </Col>
        </Row>
        
        {/* Tabla de Psicólogos */}
        <Row>
          <Table 
            bordered 
            dataSource={dataPsicologos}
            columns={columnasPsicologos} 
          />
        </Row>
      </div>,
    4: <div style={{}}>
        {/* Tabla de Psicólogos a Verificar */}
        <Table 
          bordered 
          dataSource={unverifiedPsychologists} 
          columns={columnsPsychologistsToVerify}
        />
      </div>
  };

  return (

    <ContainerApp>

      <Layout style={{ minHeight: "100vh" }}>
        <Sider handleClick={handleMenuClick}/>
        <Layout>
          <Content>
            {components[render]}
          </Content>
        </Layout>
      </Layout>

    </ContainerApp>
  )
}

export default DashboardAdmin