import React, { useState } from 'react'
import { Row, Col, Avatar, Button, Upload , Form, Input, message } from 'antd'
import { psychologistServices, userServices, uploadServices } from '../../../../services'
import { CustomSelect } from "../../../CustomInputs"

const PsychologistPersonalDataForm = ({ form, profilePictureURL, name, lastName, mail, psychologistPathologies, pathologies, description, psychologistId, userId }) => {

  const { getFieldDecorator, setFieldsValue } = form
  const { TextArea } = Input;
  const [ loadingFile, setLoadingFile ] = useState(false)
  const [ imageURL, setimageURL ] = useState(profilePictureURL)

  //<---------- FUNCIONES PARA SUBIR LA IMAGEN DE PERFIL ---------->

  const uploadImage = async (file) => {
    try {
      setLoadingFile(true)
      let response = await uploadServices.uploadSingleFile(file)
      setLoadingFile(false)
      return response;
    } catch (error) {
      console.log(error)
      message.error("Error al subir el archivo")
      setLoadingFile(false)
      return null;
    }
  }

  const convertToFormData = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    return formData;
  }

  const beforeUpload = async (file, fileList) => {
    let formDataFile = convertToFormData(file)
    let fileUploaded = await uploadImage(formDataFile);
    if ((fileUploaded) && (fileUploaded.success)) {
      setFieldsValue({
        urlProfilePicture: fileUploaded.data.urlFile,
      });
      setimageURL(fileUploaded.data.urlFile)
    }
    return Promise.reject(false)
  }

  //<-------------------------------------------------->

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyUser = {name: values.name, lastName: values.lastName, mail: values.mail}
        let bodyPsychologist = {description: values.description, urlProfilePicture: values.urlProfilePicture}
        let bodyPathologies = { pathologiesIds: values.pathologies }
        try {
          const responseUser = await userServices.modifyData(userId, bodyUser); 
          const responsePsychologist = await psychologistServices.modifyPsychologistPersonalData(psychologistId, bodyPsychologist);
          const responsePathologies = await psychologistServices.sendPathologies(psychologistId, bodyPathologies)
          console.log(responsePsychologist)
          console.log(responseUser);
          console.log(responsePathologies)
          message.success("Datos guardados")
        } catch(error) {
          message.error("Ocurrió un error, intentalo de nuevo")
          console.log(error);
        }
      }
    });
  }

  return (
    <>

      <Form onSubmit={handleSubmit}>

        {/* Sección para cambiar la imagen de perfil */}
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item>
            {
              getFieldDecorator('urlProfilePicture', {
                initialValue:
                  profilePictureURL
                ,
              })(
                <Avatar size='large' style={{marginRight: '25px'}} src={imageURL}>
                </Avatar>
              )
            }
            <Upload action={null} accept=".jpg,.png,.jpeg" beforeUpload={beforeUpload} customRequest={null}>
              <Button type="primary" loading={loadingFile}>
                Cambiar fotografía
              </Button>
            </Upload>
          </Form.Item>
        </Row>

        <Row gutter={24} style={{marginLeft: '20px', marginRight: '20px'}}>
          {/* Primera columna de datos personales */}
          <Col span={12}>
            <Form.Item>
              <label className='form-title-input'>
                Nombre
              </label>
              {
                getFieldDecorator('name', {
                  initialValue: 
                    name
                  ,
                  rules: 
                  [
                    { required: false, message: 'Ingrese un nuevo nombre'},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }  
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Correo electrónico
              </label>
              {
                getFieldDecorator('mail', {
                  initialValue: 
                    mail
                  ,
                  rules: 
                  [
                    { required: false, message: 'Ingrese una nueva dirección de correo electrónico '},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }  
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Áreas
              </label>
              {
                getFieldDecorator('pathologies', {
                  initialValue: 
                    psychologistPathologies.map( pathology => pathology.id)
                  ,
                  rules: [
                    { required: false, message: ''},
                  ],
                })(
                  <CustomSelect
                    mode="multiple"
                    disabled={false}
                    style={{ width: '100%' }}
                    placeholder="Áreas de atención"
                    data={pathologies}
                  />
                )
              }
            </Form.Item>
          </Col>
          {/* Segunda columna de datos personales */}
          <Col span={12}>
            <Form.Item>
              <label className='form-title-input'>
                Apellido
              </label>
              {
                getFieldDecorator('lastName', {
                  initialValue: 
                    lastName
                  ,
                  rules: 
                  [
                    { required: false, message: 'Ingrese un nuevo apellido'},
                  ],
                })(
                  <Input>
                  </Input>,  
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Descripción
              </label>
              {
                getFieldDecorator('description', {
                  initialValue: 
                    description
                  ,
                  rules: 
                  [
                    { required: false, message: 'Agregue una descripción'},
                  ],
                })(
                  <TextArea rows={4}/>,
                )
              }
            </Form.Item>

          </Col>
        </Row>
        
        <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
          <Button type="primary" htmlType="submit" disabled={false}>
            Guardar cambios
          </Button>   
        </Row>
      </Form>

    </>
  )
}

const WrappedPsychologistPersonalDataForm = Form.create()(PsychologistPersonalDataForm)
export default WrappedPsychologistPersonalDataForm