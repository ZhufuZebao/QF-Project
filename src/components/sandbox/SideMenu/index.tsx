import React, {useEffect, useState} from 'react';
import {useNavigate,useLocation} from 'react-router-dom'

import {Layout, Menu} from 'antd'

import {
    UserOutlined,
    ToTopOutlined,
    MonitorOutlined,
    FireOutlined,
    SnippetsOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import style from './index.module.css'
import axios from "axios";

const {Sider} = Layout

interface SideMenuProps {
    collapsed: boolean,
}

function SideMenu({collapsed}: SideMenuProps) {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [getMenuList, setGetMenuList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then(res => {
            let data = formatMenuList(res.data)
            setGetMenuList(data)
        })
    }, [])
    const formatMenuList = (data: any): any => {
        let list = []
        for (let i in data) {
            if (data[i].pagepermisson) {
                if (data[i].children && data[i].children.length > 0) {
                    list.push({
                        key: data[i].key,
                        label: data[i].title,
                        icon: getIcon(data[i].key),
                        pagepermisson: data[i].pagepermisson,
                        children: formatMenuList(data[i].children)
                    })
                } else {
                    list.push({
                        key: data[i].key,
                        label: data[i].title,
                        icon: getIcon(data[i].key),
                        pagepermisson: data[i].pagepermisson,
                    })
                }
            }
        }
        return list
    }
    const getIcon = (key: string) => {
        switch (key) {
            case '/home':
                return <HomeOutlined/>
            case '/user-manage':
                return <UserOutlined/>
            case '/right-manage':
                return <SnippetsOutlined/>
            case '/news-manage':
                return <FireOutlined/>
            case '/audit-manage':
                return <MonitorOutlined/>
            case'/publish-manage':
                return <ToTopOutlined/>
        }
    }
    const navigatePage = (key: string) => {
        navigate(key)
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={style.sideMenu}>
                <div className={style.logo}/>
                <div className={style.menuList}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={getMenuList}
                        onSelect={(item) => {
                            navigatePage(item.key)
                        }}
                        defaultOpenKeys={[`/${pathname.split('/')[1]}`]}
                    />
                </div>
            </div>
        </Sider>
    );
}

export default SideMenu;