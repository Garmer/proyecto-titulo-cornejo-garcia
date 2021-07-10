import React from "react";
import { Row, Col, Form, Button, Result, Input, Icon } from "antd";

const ResultEmail = ({ validate, handleChangeCode }) => {

  return (

    <>
      <Result
        icon={<Icon type="mail" />}
        title='Verificar dirección de correo electrónico'
        subTitle='Aún no haz verificado tu correo electrónico, revisa tu bandeja de entrada o spam'
        extra={
          <Row type="flex" justify="center" gutter={24}>
            <Form>
              <Col span={12}>
                <Form.Item>
                  <Input maxLength={6} onPressEnter={validate} onChange={handleChangeCode}></Input>
                </Form.Item>
              </Col>
                
              <Col span={12}>
                <Form.Item>
                  <Button type="primary" className="form-button" onClick={validate}>
                    Verificar código
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Row>
        }
      />
    </>
  );
}

const WrappedFormResultEmail = Form.create()(ResultEmail)
export default WrappedFormResultEmail