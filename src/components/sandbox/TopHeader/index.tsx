import React from 'react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout} from 'antd'
const {Header} = Layout

interface TopHeaderProps {
    collapsed:boolean,
    setCollapsed:(data:boolean) => void
}
function TopHeader({collapsed,setCollapsed}:TopHeaderProps) {
    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {collapsed ? <MenuUnfoldOutlined className={'trigger'} onClick={() => setCollapsed(!collapsed)}/> :
                <MenuFoldOutlined className={'trigger'} onClick={() => setCollapsed(!collapsed)}/>}
        </Header>
    );
}

export default TopHeader;