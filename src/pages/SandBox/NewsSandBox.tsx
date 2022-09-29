import React, {useState} from 'react';
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import {Outlet} from 'react-router-dom'
import './NewsSandBox.css'

import {Layout} from 'antd'
const {Content} = Layout

function NewsSandBox(props:any) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <SideMenu collapsed={collapsed}/>
            <Layout className="site-layout">
                <TopHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default NewsSandBox;