import React from 'react';
import {useNavigate} from 'react-router-dom'

import {Layout,Menu} from 'antd'

import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import style from './index.module.css'
const {Sider} = Layout

interface SideMenuProps {
    collapsed:boolean,
}
function SideMenu({collapsed}:SideMenuProps) {
    const navigate = useNavigate()
    const menuList = [
        {
            key: '/home',
            icon: <UserOutlined />,
            label: '首页',
        },
        {
            key: '/user-manage',
            icon: <VideoCameraOutlined />,
            label: '用户管理',
            children:[
                {
                    key: '/user-manage/list',
                    label: '用户列表',
                }
            ]
        },
        {
            key: '/right-manage',
            icon: <UploadOutlined />,
            label: '权限管理',
            children:[
                {
                    key: '/right-manage/role/list',
                    label: '角色列表',
                },
                {
                    key: '/right-manage/right/list',
                    label: '权限列表',
                }
            ]
        },
    ]
    const navigatePage = (key:string) => {
        navigate(key)
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={style.logo} />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                items={menuList}
                onSelect={(item) => {navigatePage(item.key)}}
            />
        </Sider>
    );
}

export default SideMenu;