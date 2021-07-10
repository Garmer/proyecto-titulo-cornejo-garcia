import React, { useState } from 'react'
import { Row, Col, Tabs, Form, Input, Button, Avatar, Upload, message } from 'antd'
import ContainerApp from "../../../components/ContainerApp"
import LeftContainer from '../../../components/Profiles/LeftContainer/LeftContainer'
import RightContainer from '../../../components/Profiles/RightContainer/RightContainer'
import ChangePasswordForm from "../../../components/Forms/ChangePasswordForm/ChangePasswordForm"

const Admin = () => {

  const TabPane = Tabs.TabPane;

  const [file,setFile] = useState(null); 

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onPreview: (file) => {
      console.log(file)
    },
    onChange(info) {
      setFile(info.file)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (

    <ContainerApp>
      <Row>
        {/* Container ubicado a la izquierda de la pantalla
        contiene la imagen de perfil del usuario (avatar), nombre, correo electrónico
        y rut */}
        <Col sm={24} lg={8} style={{ textAlign:'center', borderRadius: '20px', borderStyle: 'solid' }}>
          <LeftContainer
            nombre='Pedro Serrano Vera'
            email='Correo electrónico'
            rut='RUT'
            hccorreo='pedro_sv@gmail.com'
            hcrut='14.314.179-k' />
        </Col>
        {/* Container ubicado a la derecha de la pantalla
        contiene un tabbar que filtrará el contenido según diferentes secciones:
        modificar datos personales y cambiar contraseña */}
        <Col sm={24} lg={16} style={{ borderRadius: '20px', borderStyle: 'solid' }}>
          <RightContainer>
            {/* Tab 'Modificar datos personales' */}
            <TabPane tab="Datos personales" key="1">
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar size='large' style={{marginRight: '25px'}}></Avatar>
                <Upload {...props}>
                  <Button type="primary" disabled={false}>
                    Cambiar fotografía
                  </Button>
                </Upload>
              </Row>
              <Row>
                  <Form style={{display: 'flex', justifyContent: 'center'}}>
                  {/* Primera columna de datos personales */}
                  <Col>
                    <Form.Item>
                      <label className='form-title-input'>
                        Nombres
                      </label>
                      <Input>
                      </Input>  
                    </Form.Item>

                    <Form.Item>
                      <label className='form-title-input'>
                        Correo electrónico
                      </label>
                      <Input>
                      </Input>  
                    </Form.Item>
                  </Col>

                  {/* Segunda columna de datos personales */}
                  <Col style={{marginLeft: '25px'}}>
                    <Form.Item>
                      <label className='form-title-input'>
                        Apellidos
                      </label>
                      <Input>
                      </Input>  
                    </Form.Item>
                    
                  </Col>
                  </Form>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                <Button type="primary" htmlType="submit" disabled={false}>
                  Guardar cambios
                </Button>   
              </Row>
            </TabPane>

            {/* Tab 'Cambiar Contraseña' */}
            <TabPane tab="Cambiar contraseña" key="2">
              <ChangePasswordForm/>
            </TabPane>
          </RightContainer>
        </Col>
      </Row>
    </ContainerApp>
  )
}

export default Admin