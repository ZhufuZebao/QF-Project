import React from 'react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout} from 'antd'
import style from './index.module.css'
import UserShow from "./UserShow";
const {Header} = Layout

interface TopHeaderProps {
    collapsed:boolean,
    setCollapsed:(data:boolean) => void
}
function TopHeader({collapsed,setCollapsed}:TopHeaderProps) {
    return (
        <Header className="site-layout-background" style={{ padding: 0,display:'flex',justifyContent:"space-between"}}>
            {collapsed ? <MenuUnfoldOutlined className={style.trigger} onClick={() => setCollapsed(!collapsed)}/> :
                <MenuFoldOutlined className={style.trigger} onClick={() => setCollapsed(!collapsed)}/>}
                <div className={style.userShow}><UserShow/></div>
        </Header>
    );
}

export default TopHeader;