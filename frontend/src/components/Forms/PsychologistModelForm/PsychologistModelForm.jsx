import React, { useState, useEffect } from 'react'
import { Col, Form, Button, message } from 'antd'
import { pathologyServices, workModelServices, psychologistServices } from "../../../services/"
import { CustomSelect } from "../../../components/CustomInputs/"


const PsychologistModelForm = ({ form, psychologistId, changeStep }) => {

  const { getFieldDecorator } = form

  const [pathologies, setPathologies] = useState(null)
  const [workModels, setWorkModels] = useState(null)

  const loadPathologies = async () => {
    try {
      const response = await pathologyServices.getPathology();
      if (response.success) {
        setPathologies(response.data.pathologies)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadWorkModel = async () => {
    try {
      const response = await workModelServices.getWorkModels();
      if (response.success) {
        setWorkModels(response.data.workModels)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        try {
          const responsePathologies = await psychologistServices.sendPathologies(psychologistId ,{ pathologiesIds: values.pathologiesInput});
          const responseWorkModel = await psychologistServices.sendWorkModel(psychologistId, {workModelId: values.workModelInput});
          if ((responsePathologies.success) && (responseWorkModel.success)) {
            message.success('Formulario enviado exitosamente')
            {changeStep()}
          }
        } catch(error) {
          console.log(error)
          message.error('Error al enviar el formulario')
        }
      }
    });
  }

  useEffect(() => {
    loadPathologies()
    loadWorkModel()
  }, [])

  return (
    <>
      <Col span={12}>
        <Form onSubmit={handleSubmit}>
            <h3>Áreas de atención</h3>
            <Form.Item>
              {
                getFieldDecorator('pathologiesInput', {
                  rules:
                  [
                    {required: true, message: 'Por favor seleccione una área de atención'},
                  ],
                })(
                  <CustomSelect 
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Áreas de atención"
                  data={pathologies}/>
                )
              }
            </Form.Item>
          
            <h3>Modelo terapéutico</h3>
            <Form.Item>
              {
                getFieldDecorator('workModelInput', {
                  rules:
                  [
                    {required: true, message: 'Por favor seleccione un modelo terapéutico'},
                  ],
                })(
                  <CustomSelect
                  style={{ width: '100%' }}
                  placeholder="Modelo terapéutico"
                  data={workModels}/>
                )
              }
            </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar formulario
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </>
  )
}

const WrappedPsychologistModelForm = Form.create()(PsychologistModelForm)
export default WrappedPsychologistModelForm