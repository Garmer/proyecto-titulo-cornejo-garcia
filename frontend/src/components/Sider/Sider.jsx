import React, { useState, useEffect } from "react";
import { Menu, Layout, Icon } from "antd";

const Sider = (props) => {

  const { handleClick } = props;
  const [collapse, setCollapse] = useState(true);
  const handleCollapse = () => {
    setCollapse(true);
  }

  return (

    <Layout.Sider collapsible={collapse} onCollapse={handleCollapse}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" onClick={handleClick}>
          <Icon type="home" />
          <span>Inicio</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={handleClick}>
          <Icon type="user" />
          <span>Gestionar Representantes</span> 
        </Menu.Item>
        <Menu.Item key="3" onClick={handleClick}>
          <Icon type="user" />
          <span>Gestionar Psicólogos</span>
        </Menu.Item>
        <Menu.Item key="4" onClick={handleClick}>
          <Icon type="file-search" />
          <span>Verificar Psicólogos</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}

export default Sider