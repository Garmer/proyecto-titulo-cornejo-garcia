import React, { useState } from 'react'
import { Row, Col, Icon, Checkbox } from 'antd'
import{ CustomInput, CustomSelect } from "../../components/CustomInputs"

const FilterPsychologistMenu = () => {

  const styles = {
    marginBetweenInputs: "20px"
  }

  const [terapeuticModelsSelected, setTerapeuticModelsselected] = useState([])
  const [languagesSelected, setLanguagesSelected] = useState([])
  const [gendersSelected, setGendersSelected] = useState([])
  const [modalAppointmentVisible, setModalAppointmentVisible] = useState(false)

  const handleChangeTerapeuticModel = (checked) => {
    setTerapeuticModelsselected([...checked])
  }

  const handleChangeLanguage = (checked) => {
    setLanguagesSelected([...checked])
  }

  const handleChangeGender = (checked) => {
    setGendersSelected([...checked])
  }

  const openModalAppointment = (e) => {
    setModalAppointmentVisible(true)
  }

  const areas = [
    { label: 'Depresión', value: 'Modelo 1' },
    { label: 'Desconcentración', value: 'Modelo 2' },
    { label: 'Ansiedad', value: 'Modelo 3' }
  ]

  const optionsTerapeuticModels = [
    { label: 'Modelo 1', value: 'Modelo 1' },
    { label: 'Modelo 2', value: 'Modelo 2' },
    { label: 'Modelo 3', value: 'Modelo 3' }
  ]

  const optionsLanguages = [
    { label: 'Español', value: 'Español' },
    { label: 'Inglés', value: 'Inglés' }
  ]

  const genders = [
    { label: 'Hombre', value: 'Hombre' },
    { label: 'Mujer', value: 'Mujer' }
  ]

  return (
    <>
      <Col  md={7}  lg={5} style={{ height: " calc(100vh - 67px)", padding: "20px 20px", border: "1px solid #e8e8e8", borderRadius: "2px" }}>
        <div style={{ position: "absolute", zIndex: 2, right: 1, top: 1, padding: 4, borderRadius: 2, color: "white", background: "black", cursor: "pointer" }}>
          <Icon type="left"/>
        </div>
        <Row style={{ marginBottom: styles.marginBetweenInputs }}>
          <Col>
            <h3>Psicólogo</h3>
            <CustomInput
              placeholder="Buscar por nombre del psicólogo(a)"
              suffix={
                <Icon type="search" style={{ color: 'rgba(0,0,0,.45)', cursor: "pointer" }} />
              }
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: styles.marginBetweenInputs }}>
          <Col>
            <h3>Áreas</h3>
            <CustomSelect
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Seleccione un área"
              data={areas}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: styles.marginBetweenInputs }}>
          <Col>
            <h3>Modelo terapéutico</h3>
            <Checkbox.Group onChange={handleChangeTerapeuticModel} style={{ width: '100%' }}>
            <Row style={{ marginTop: "5px" }}>
            {optionsTerapeuticModels.map( (terapeuticModel, index) => (
              <Col key={index} className="col-checkbox-filter" lg={12} xs={24}>
                <Checkbox value={terapeuticModel.value}>{terapeuticModel.label}</Checkbox>
              </Col>
            ))}
            </Row>
            </Checkbox.Group>
            <div style={{ marginTop: "5px" }}>
              {terapeuticModelsSelected.map( (terapeuticModel, index) => {
                return (
                  <span key={index}>
                    { terapeuticModel + ", " }
                  </span>
                )
              })}
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: styles.marginBetweenInputs }}>
          <Col>
            <h3>Idiomas</h3>
            <Checkbox.Group onChange={handleChangeLanguage} style={{ width: '100%' }}>
            <Row style={{ marginTop: "5px" }}>
            {optionsLanguages.map( (language, index) => (
              <Col key={index} lg={12} xs={24} className="col-checkbox-filter">
                <Checkbox value={language.value}>{language.label}</Checkbox>
              </Col>
            ))}
            </Row>
            </Checkbox.Group>
            <div style={{ marginTop: "5px" }}>
              {languagesSelected.map( (language, index) => {
                return (
                  <span key={index}>
                    { language + ", " }
                  </span>
                )
              })}
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: styles.marginBetweenInputs }}>
          <Col>
            <h3>Género</h3>
            <Checkbox.Group onChange={handleChangeGender} style={{ width: '100%' }}>
            <Row style={{ marginTop: "5px" }}>
            {genders.map( (gender, index) => (
              <Col key={index} lg={12} xs={24} className="col-checkbox-filter">
                <Checkbox value={gender.value}>{gender.label}</Checkbox>
              </Col>
            ))}
            </Row>
            </Checkbox.Group>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default FilterPsychologistMenu