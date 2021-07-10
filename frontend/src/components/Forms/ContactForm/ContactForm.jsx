import React, { useEffect } from 'react'
import { Icon, Button, Form, Input  } from 'antd'


const ContactForm = ({ form, sendContactMessage }) => {
  const { getFieldDecorator } = form
  useEffect(() => {
    
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    form.validateFields( async (err, values) => {
      if(!err){
        await sendContactMessage(values)
        form.resetFields()
      }
    })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Nombre"
        name="name"
      >
        {
          getFieldDecorator('name', {
            rules:
            [
              { required: true, message: 'Por favor ingrese su grado académico'},
            ],
          })(
            <Input
              placeholder="Ingresa tu nombre"
              prefix={<Icon type="user" className="site-form-item-icon" />}
            />
          )
        }
      </Form.Item>

      <Form.Item
        label="Correo"
        rules={[{ required: true, type: `email`, message: `Please enter your email.` }]}
        name="email"
      >
        {
          getFieldDecorator('mail', {
            rules:
            [
              { required: true, message: 'Por favor ingrese su grado académico'},
            ],
          })(
            <Input
              placeholder="Ingresa tu correo"
              prefix={<Icon type="mail" className="site-form-item-icon" />}
            />
          )
        }
      </Form.Item>

      <Form.Item
        label="Mensaje"
      >
        {
          getFieldDecorator('message', {
            rules:
            [
              { required: true, message: 'Por favor ingrese su grado académico'},
            ],
          })(
            <Input.TextArea
              placeholder="Tu mensaje"
              rows={5}
            />
          )
        }
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  )

}

const WrappedContactForm = Form.create()(ContactForm)
export default WrappedContactForm