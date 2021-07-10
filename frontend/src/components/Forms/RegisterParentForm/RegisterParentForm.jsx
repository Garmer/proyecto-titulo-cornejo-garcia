import React, { useState, useContext } from 'react'
import { Button, Form, Input, Checkbox, DatePicker, Select, message} from 'antd'
import { Link } from "react-router-dom"
import { StoreContext } from "../../../context/StoreContext"

const RegisterParentForm = ({ form }) => {

  const { getFieldDecorator } = form
  const { actions } = useContext(StoreContext)
  const { authActions } = actions
  const [confirmDirty, setConfirmDirty] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields( async (err, values) => {
      if (!err) {
        let bodyuser = {...values, role: 'parent'}
        try {
          const response = await authActions.register(bodyuser);
          message.success('Cuenta creada exitosamente', 10)
          form.resetFields()
          console.log(response);
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

  /* <----------Funciones encargadas de validar la edad----------> */

  const validateAge = (rule, value, callback) => {
    let fechaActual = new Date();
    let cumpleanos = new Date(value);
    let edad = fechaActual.getFullYear() - cumpleanos.getFullYear();
    var mes = fechaActual.getMonth() - cumpleanos.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    if (edad >= 18) {
      callback();
    } else {
      callback('Registro no permitido a usuarios menores de edad')
    }
  }

  /* <----------------------------------------------------------------------> */
  
  const { Option } = Select;

  const codigoNumerico = getFieldDecorator('prefix', {
    initialValue: '+569',
  })(
    <Select style={{ width: 85 }}>
      <Option value="+569">+569</Option>
      <Option value="+549">+549</Option>
      <Option value="+519">+519</Option>
    </Select>,
  );

  return (

    <Form className="form-box" onSubmit={handleSubmit}>
      <label className='form-title-input'>
        Nombre
      </label>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: 
          [
            { required: true, message: 'Por favor ingrese su nombre' },
          ],
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
          rules: 
          [
            { required: true, message: 'Por favor ingrese su apellido' },
          ],
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
            { required: true, message: 'Por favor ingrese un correo electrónico' },
          ],
        })(
          <Input
            className='text-input'
            placeholder="ejemplo@gmail.com"
          />,
        )}
      </Form.Item>

      <label className='form-title-input'>
        Número de télefono
      </label>
      <Form.Item>
        {getFieldDecorator('phoneNumber', {
          rules: 
          [
            { required: true, message: 'Por favor ingrese un número telefónico' },
          ],
        })(<Input addonBefore={codigoNumerico} style={{ width: '100%' }} />)}

      </Form.Item>

      <label className='form-title-input'>
        Fecha de nacimiento
      </label>
      <Form.Item>
        {getFieldDecorator('dateOfBirth', {
          rules: 
          [
            { required: true, message: 'Por favor seleccione una fecha de nacimiento' },
            { validator: validateAge },
          ],
        })(<DatePicker placeholder='' />)}
      </Form.Item>

      <label className='form-title-input'>
        Contraseña
      </label>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: 
          [
            { required: true, message: 'Por favor ingrese su contraseña' },
            { min: 8, message: 'La contraseña debe contener un mínimo de 8 carácteres'},
            { max: 15, message: 'La contraseña debe contener un máximo de 15 carácteres'},
            { validator: validateToNextPassword },
          ],
        })(<Input.Password />)}
      </Form.Item>

      <label className='form-title-input'>
        Repita su contraseña
      </label>
      <Form.Item>
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
          Declaro haber leído y acepto los <Link to="../tyc">términos y condiciones</Link>
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

const WrappedRegisterParentForm = Form.create()(RegisterParentForm)
export default WrappedRegisterParentForm