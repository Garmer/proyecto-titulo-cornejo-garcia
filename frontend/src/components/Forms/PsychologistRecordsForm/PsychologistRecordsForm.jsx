import React, { useState } from 'react'
import { Row, Col, Form, Icon, Input, Button, Upload, message , DatePicker } from 'antd'
import { uploadServices, workHistoryServices , academicHistoryServices, psychologistServices } from "../../../services/"


const PsychologistRecordsForm = ({ form, psychologist , changeStep }) => {

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form
  const [ loadingFile, setLoadingFile ] = useState(false)

  //<---------- FUNCIONES PARA SUBIR EL CERTIFICADO ---------->

  const uploadFile = async (file) => {
    try {
      setLoadingFile(true)
      let response = await uploadServices.uploadSingleFile(file)
      setLoadingFile(false)
      return response;
    } catch (error) {
      console.log(error)
      message.error("Error al subir el archivo");
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
    let fileUploaded = await uploadFile(formDataFile, fileList);
    if ((fileUploaded) && (fileUploaded.success)) {
      setFieldsValue({
        urlDegreeCertificate: fileUploaded.data.urlFile,
      });
    }
    return Promise.reject(false)
  }

  //<-------------------------------------------------->

  //<---------- FUNCIONES PARA VALIDAR LOS INPUTS RELACIONADOS A FECHAS  ---------->

  const validateStartDate = (rule, value, callback) => {
    let fechaActual = new Date()
    
    if (value && value > fechaActual){
      callback('Ingrese una fecha válida');
    } 
    else if (value && value.isAfter(form.getFieldValue('endDate'))){
      callback('La fecha de inicio no puede ocurrir después que la fecha de término');
    } else {
      callback();
    }

  }

  const validateEndDate = (rule, value, callback) => {
    let fechaActual = new Date()

    if (value && value > fechaActual){
      callback('Ingrese una fecha válida');
    } else if (value && value.isBefore(form.getFieldValue('startDate'))){
      callback('La fecha de término no puede ocurrir antes que la fecha de inicio');
    } else {
      callback()
    }
  }

  //<-------------------------------------------------->

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if(!err) {
        let bodyWorkHistory = {psychologistId: psychologist.id, position: values.position, company:values.company, descriptionOfActivity:values.descriptionOfActivity, startDate:values.startDate, endDate: values.endDate}
        let bodyAcademicHistory = { psychologistId: psychologist.id, degree: values.degree, specialty: values.specialty, college: values.college, urlDegreeCertificate: values.urlDegreeCertificate }
        try {
          const responseWorkHistory = await workHistoryServices.addWorkHistory(bodyWorkHistory)
          const responseAcademicHistory = await academicHistoryServices.addAcademicHistory(bodyAcademicHistory)
          const responseVerification = await psychologistServices.updateVerificationInProcess(psychologist.id, {verificationInProcess: true})
          if ((responseWorkHistory.success) && (responseAcademicHistory.success) && (responseVerification.success)) {
            message.success('Formulario enviado exitosamente')
            {changeStep()}
          }
        } catch (error) {
          console.log(error)
          message.error('Error al enviar el formulario')
        }
      }
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={24} md={{span: 24, offset: 3}} lg={24}>
            <h3>Antecedentes Laborales</h3>
            <Form.Item>
              <label className='form-title-input'>
                Cargo actual
              </label>
              {
                getFieldDecorator('position', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese un cargo'},
                  ],
                })(
                  <Input>
                  </Input>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Lugar actual
              </label>
              {
                getFieldDecorator('company', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese una empresa/compañia'},
                  ],
                })(
                  <Input>
                  </Input>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Descripción de Actividades
              </label>
              {
                getFieldDecorator('descriptionOfActivity', {
                  rules:
                  [
                    { required: true, message: 'Por favor describa las actividades realizadas' },
                  ],
                })(
                  <Input>
                  </Input>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Fecha de Inicio
              </label>
              {
                getFieldDecorator('startDate', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese una fecha' },
                    { validator: validateStartDate },
                  ],
                })(
                  <DatePicker placeholder='' showToday={true}/>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Fecha de Termino
              </label>
              {
                getFieldDecorator('endDate', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese una fecha' },
                    { validator: validateEndDate },
                  ],
                })(
                  <DatePicker placeholder='' showToday={true}/>,
                )
              }
            </Form.Item>
          
            <h3>Antecedentes Académicos</h3>
            <Form.Item>
              <label className='form-title-input'>
                Último título académico
              </label>
              {
                getFieldDecorator('degree', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese su grado académico'},
                  ],
                })(
                  <Input>
                  </Input>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Especialidad
              </label>
              {
                getFieldDecorator('specialty', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese su especialidad'},
                  ],
                })(
                  <Input>
                  </Input>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Instituto de educación superior
              </label>
              {
                getFieldDecorator('college', {
                  rules:
                  [
                    { required: true, message: 'Por favor ingrese su instituto de educación superior'},
                  ],
                })(
                  <Input>
                  </Input>,
                )
              }
            </Form.Item>

            <Form.Item>
              <label className='form-title-input'>
                Certificado de título
              </label>
              {
                getFieldDecorator('urlDegreeCertificate', {
                  rules:
                  [
                    { required: true, message: 'Porfavor adjunte una copia de su certificado de título'},
                  ],
                })(
                  <Upload action={null} accept=".pdf" beforeUpload={beforeUpload} customRequest={null}>
                    <Button type="primary" loading={loadingFile}>
                      <Icon type="upload"/>
                      Subir Certificado (.pdf)
                    </Button>
                  </Upload>
                )
              }
            </Form.Item>
            { form.getFieldValue('urlDegreeCertificate') 
              ?
              <a href={form.getFieldValue('urlDegreeCertificate')} target="_blank" rel="noreferrer">
                <span style={{color: 'blue'}}>
                  <u>Archivo Subido</u>
                </span>
              </a>
              : null
            }
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar formulario
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  )
}

const WrappedPsychologistRecordsForm = Form.create()(PsychologistRecordsForm)
export default WrappedPsychologistRecordsForm