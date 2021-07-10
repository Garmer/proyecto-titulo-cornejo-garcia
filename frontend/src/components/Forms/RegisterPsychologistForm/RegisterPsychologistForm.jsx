import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, Input, Checkbox, message} from 'antd'
import { Link } from "react-router-dom"
import { StoreContext } from "../../../context/StoreContext"
import { languagesServices, genderServices } from "../../../services/"
import { CustomSelect } from "../../../components/CustomInputs/"


const RegisterPsychologistForm = ({ form }) => {

  const { getFieldDecorator } = form
  const { actions } = useContext(StoreContext)
  const { authActions } = actions
  const [ confirmDirty, setConfirmDirty ] = useState(null)
  const [ genders, setGenders ] = useState(null)
  const [ languages, setLanguages ] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyuser = {...values, role: 'psychologist'}
        try {
          const response = await authActions.register(bodyuser);
          message.success('Cuenta creada exitosamente', 10)
          form.resetFields()
          console.log(response)
          
        } catch(error) {
          message.error('Error al crear la cuenta')
          console.log(error);
        }
      }
    });
  }

  /* <----------Funciones encargadas de validar las contraseñas----------> */

  const handleConfirmBlur = (event) => {
    setConfirmDirty(event.target.value)
  }

  const validateToNextPassword = (rule, value, callback) => {

    if (value && confirmDirty) {
      form.validateFields(['confirmedPassword'], { force: true });
    }
    callback();

  };

  const compareToFirstPassword = (rule, value, callback) => {

    if (value && value !== form.getFieldValue('password')) {
      callback('Las dos contraseñas ingresadas no coinciden');
    } else {
      callback();
    }
  };

  /* <----------------------------------------------------------------------> */

  /* <----------Funciones encargadas de validar el RUT----------> */

  const validateRUT = (rules, values, callback) => {
    if (typeof values === 'string' || typeof values === 'number') {
      const rutWithoutFormat = cleanRUT(values);
      const rutWithoutDV = rutWithoutFormat.slice(0, -1);
      const rutDv = rutWithoutFormat.split('').pop().toLowerCase();
      if (calculateDV(rutWithoutDV) != rutDv) {
        callback('Ingrese un rut válido')
      } else {
        callback()
      }
      //return calculateDV(rutWithoutDV) === rutDv;
    }
    else {
      callback('Ingrese un rut válido')
      //return false;
    }
  };
  
  const calculateDV = rut => {
    let suma = 0;
    let rutReversa = cleanRUT(rut).split('').reverse();
  
    for (let i = 0, j = 2; i < rutReversa.length; i++, j < 7 ? j++ : j = 2) {
      suma += rutReversa[i] * j;
    }
  
    let resultado = 11 - (suma % 11)
    if (resultado === 11) return '0';
    if (resultado === 10) return 'k';
    return String(resultado);
  };
  
  const cleanRUT = rut => {
    return String(rut).replace(/[^0-9a-z]/gi, '');
  }

  /* <----------------------------------------------------------------------> */

  const loadGenders = async () => {
    try {
      const response = await genderServices.getGenders();
      if (response.success) {
        setGenders(response.data.genders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadLanguages = async () => {
    try {
      const response = await languagesServices.getLanguages();
      if (response.success) {
        setLanguages(response.data.languages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadGenders()
    loadLanguages()
  },[])

  return (

    <Form className="form-box" onSubmit={handleSubmit}>
      <label className='form-title-input'>
        Nombre
      </label>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Por favor ingrese su nombre' }],
        })(
          <Input
            className='text-input'
          />,
        )}
      </Form.Item>

      <label className='form-title-input'>
        Apellido
      </label>
      <Form.Item>
        {getFieldDecorator('lastName', {
          rules: [{ required: true, message: 'Por favor ingrese su apellido' }],
        })(
          <Input
            className='text-input'
          />,
        )}
      </Form.Item>

      <label className='form-title-input'>
        RUT
      </label>
      <Form.Item>
        {getFieldDecorator('rut', {
          rules:
            [
              { required: true, message: 'Por favor ingrese su RUT' },
              { validator: validateRUT },
            ],
        })(
          <Input
            className='text-input'
            placeholder="12345678-9"
          />,
        )}
      </Form.Item>

      <label className='form-title-input'>
        Dirección de correo electrónico
      </label>
      <Form.Item>
        {getFieldDecorator('mail', {
          rules:
            [
              { required: true, type: "email", message: 'Por favor ingrese un correo electrónico' },
            ],
        })(
          <Input
            className='text-input'
            placeholder="ejemplo@gmail.com"
          />)}
      </Form.Item>

      <label className='form-title-input'>
        Género
      </label>
      <Form.Item>
        {getFieldDecorator('gender', {
          rules:
            [
              { required: true, message: 'Por favor seleccione un género' },
            ],
        })(
          <CustomSelect
          style={{ width: '100%' }}
          placeholder="Seleccione un género"
          data={genders}
          />)}
      </Form.Item>

      <label className='form-title-input'>
        Idiomas
      </label>
      <Form.Item>
        {getFieldDecorator('languages', {
          rules:
            [
              { required: true, message: 'Por favor seleccione al menos un idioma' },
            ],
        })(
          <CustomSelect
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Seleccione al menos un idioma"
          data={languages}
          />)}
      </Form.Item>

      <label className='form-title-input'>
        Contraseña
      </label>
      <Form.Item hasFeedback>
        {getFieldDecorator('password', {
          rules:
            [
              { required: true, message: 'Por favor ingrese su contraseña' },
              { min: 8, message: 'La contraseña debe contener un mínimo de 8 carácteres' },
              { max: 15, message: 'La contraseña debe contener un máximo de 15 carácteres' },
              { validator: validateToNextPassword },
            ],
        })(<Input.Password />)}
      </Form.Item>

      <label className='form-title-input'>
        Repita su contraseña
      </label>
      <Form.Item hasFeedback>
        {getFieldDecorator('confirmedPassword', {
          rules:
            [
              { required: true, message: 'Por favor repita la contraseña' },
              { validator: compareToFirstPassword },
            ],
        })(<Input.Password onBlur={handleConfirmBlur}/>)}
      </Form.Item>

      <p>
        <Checkbox>
          Declaro haber leído y acepto los <Link to="../tyc"> términos y condiciones</Link>
        </Checkbox>
      </p>

      <Button type="primary" htmlType="submit" className="form-button">
        Registrarme
      </Button>
      <div style={{ textAlign: "center", margin: "0 auto" }}>
        <p className='not-account'>
          ¿Ya tienes una cuenta?
          <Link to='../login'>  Inicia sesión </Link>
        </p>
      </div>
    </Form>
  )
}

const WrappedRegisterPsychologistForm = Form.create()(RegisterPsychologistForm)
export default WrappedRegisterPsychologistForm