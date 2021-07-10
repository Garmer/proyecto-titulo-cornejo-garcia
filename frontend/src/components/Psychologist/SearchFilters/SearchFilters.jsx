import React, { useState, useEffect } from 'react'
import moment from "moment"
import { withRouter } from "react-router-dom"
import { Row, Col, Icon, Checkbox, message, Form, Button } from "antd"
import{ CustomInput, CustomSelect } from "../../CustomInputs"
import { pathologyServices, workModelServices, languagesServices, genderServices } from "../../../services/"

const SearchFilters = ({ form, findPsychologists }) => {
  const [pathologies, setPathologies] = useState([])
  const [workModels, setWorkModels] = useState([])
  const [languages, setLanguages] = useState([])
  const [genders, setGenders] = useState([])
  const [loading, setLoading] = useState(false)

  const { getFieldDecorator, validateFields } = form

  const styles = {
    marginBetweenInputs: "20px"
  }

  const getPathologies = async () => {
    try{
      const response = await pathologyServices.getPathology()
      if(response.success){
        setPathologies(response.data.pathologies)
      }
    }catch(error) {
      console.log(error)
      message.error("Ocurrió un error cargando áreas")
    }
  }

  const getWorkModels = async () => {
    try{
      const response = await workModelServices.getWorkModels()
      if(response.success){
        setWorkModels(response.data.workModels)
      }
    }catch(error) {
      console.log(error)
      message.error("Ocurrió un error cargando áreas")
    }
  }

  const getLanguages = async () => {
    try{
      const response = await languagesServices.getLanguages()
      if(response.success){
        setLanguages(response.data.languages)
      }
    }catch(error) {
      console.log(error)
      message.error("Ocurrió un error cargando áreas")
    }
  }

  const getGenders = async () => {
    try{
      const response = await genderServices.getGenders()
      if(response.success){
        setGenders(response.data.genders)
      }
    }catch(error) {
      console.log(error)
      message.error("Ocurrió un error cargando áreas")
    }
  }

  const searchPsychologists = async (filterValues) => {
    try{
      setLoading(true)
      await findPsychologists(filterValues)
      setLoading(false)
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields( async (err, values) => {
      if (!err) {
        let body = {
          name: values.name || null,
          pathologies: values.pathologies && values.pathologies != "" ? values.pathologies : null,
          workModels: values.workModels && values.workModels != "" ? values.workModels : null,
          languages: values.languages &&  values.languages != "" ?  values.languages : null,
          genders: values.genders && values.genders != "" ? values.genders : null
        }

        await searchPsychologists(body)
      }

    })
  }

  const psicologists = [
    {
      nombre: "Paula Escobar",
      foto_perfil: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-C0ZD4kFhnJBWt3mk3tgeUU-uCBdpyFNLQ&usqp=CAU"
    },
    {
      nombre: "María Jimenez",
      foto_perfil: "https://cdnb.20m.es/sites/112/2019/04/cara6-620x618.jpg"
    },
    {
      nombre: "Claudio Valdivia",
      foto_perfil: "https://cdnb.20m.es/sites/112/2019/04/cara22-620x620.jpg"
    },
    {
      nombre: "Paz Urrutia",
      foto_perfil: "https://www.uandes.cl/wp-content/uploads/2019/01/solange-contreras-direccion-de-personas-uandes-1.jpg"
    },
    {
      nombre: "Ignacia Marín",
      foto_perfil: "https://previews.123rf.com/images/dolgachov/dolgachov1604/dolgachov160401829/54866409-personas-el-cuidado-de-la-salud-de-la-vista-de-negocios-y-concepto-de-la-educaci%C3%B3n-la-cara-de-mujer-jov.jpg"
    },
    {
      nombre: "Rodrigo Miranda",
      foto_perfil: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0iAxGNQ5h9k2Pr1J_iUKEZz0fbK0KRQIytw&usqp=CAU"
    }
  ]

  useEffect(() => {
    getPathologies()
    getWorkModels()
    getLanguages()
    getGenders()
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ marginBottom: styles.marginBetweenInputs }}>
        <Col>
          <h3>Psicólogo</h3>
          {getFieldDecorator('name', {
            })
            (
              <CustomInput
                placeholder="Buscar por nombre del psicólogo(a)"
                suffix={
                  <Icon type="search" style={{ color: 'rgba(0,0,0,.45)', cursor: "pointer" }} />
                }
              />   
            )
          }
        </Col>
      </Row>
      <Row style={{ marginBottom: styles.marginBetweenInputs }}>
        <Col>
          <h3>Áreas</h3>
          {getFieldDecorator('pathologies', {
            })
            (
              <CustomSelect
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Seleccione una o más áreas"
                data={pathologies}
              />
            )
          }
        </Col>
      </Row>
      <Row style={{ marginBottom: styles.marginBetweenInputs }}>
        <Col>
          <h3>Modelo terapéutico</h3>
          {getFieldDecorator('workModels', {
            })
            (
              <CustomSelect
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Seleccione uno o más modelos"
                data={workModels}
              />
            )
          }
        </Col>
      </Row>
      <Row style={{ marginBottom: styles.marginBetweenInputs }}>
        <Col>
          <h3>Idiomas</h3>

          {getFieldDecorator('languages', {
            })
            (
              <Checkbox.Group style={{ width: '100%' }}>
                <Row style={{ marginTop: "5px" }}>
                {languages.map( (language, index) => (
                  <Col key={index} lg={12} xs={24} className="col-checkbox-filter">
                    <Checkbox value={language.id}>{language.name}</Checkbox>
                  </Col>
                ))}
                </Row>
              </Checkbox.Group>
            )
          }
        </Col>
      </Row>
      <Row style={{ marginBottom: styles.marginBetweenInputs }}>
        <Col>
          <h3>Género</h3>
          {getFieldDecorator('genders', {
            })
            (
              <Checkbox.Group style={{ width: '100%' }}>
                <Row style={{ marginTop: "5px" }}>
                  {genders.map( (gender, index) => (
                    <Col key={index} lg={12} xs={24} className="col-checkbox-filter">
                      <Checkbox value={gender.id}>{gender.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            )
          }
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="primary" size="large" htmlType="submit"> 
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}



const WrappedSearchFiltersFrom = Form.create()(SearchFilters)
export default withRouter(WrappedSearchFiltersFrom)