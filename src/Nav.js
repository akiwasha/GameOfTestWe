import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Menu } from 'antd';
import { HomeOutlined, HeartTwoTone } from '@ant-design/icons';

function Nav() {
  return (
    <nav>
      <Menu style={{ textAlign: 'center' }} mode="horizontal" theme="dark">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item
          key="wishlist"
          icon={<HeartTwoTone twoToneColor="#eb2f96" />}
        >
          <Link to="/wishlist">My Characters</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

export default Nav;
