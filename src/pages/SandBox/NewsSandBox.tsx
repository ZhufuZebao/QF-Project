import React, {useEffect, useState} from 'react';
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import {Outlet} from 'react-router-dom'
import './NewsSandBox.css'

import {Layout,Spin} from 'antd'
import {initialize} from "../../server/server";
import {useDispatch, useSelector} from "react-redux";
import {setRegionList,setRoleList} from '../../redux/reducers/globalReducer'
import {RootState} from "../../redux/store";
const {Content} = Layout

function NewsSandBox(props:any) {
    const dispatch =  useDispatch()
    const {loadingNumber}  = useSelector((state:RootState) => state.globalSlice)
    useEffect(() => {
        initialize('/regions').then(res => {
            if(res.status === 200){
                dispatch(setRegionList(res.data))
            }
        })
        initialize('/roles').then(res => {
            if(res.status === 200){
                let data = res.data
                data.map((item:any) => {
                    return {id:item.id,roleName:item.roleName,roleType:item.roleType}
                })
                dispatch(setRoleList(data))
            }
        })
    },[dispatch])
    useEffect(() => {
        if(loadingNumber === 0){
            setLoading(false)
        }else{
            setLoading(true)
        }
    },[loadingNumber])
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
        <Layout>
            <SideMenu collapsed={collapsed}/>
            <Layout className="site-layout">
                <TopHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 30,
                        minHeight: 280,
                        overflow:"auto",
                        borderRadius:'8px'
                    }}
                >
                    <Spin spinning={loading} delay={500}>
                        <Outlet/>
                    </Spin>
                </Content>
            </Layout>
        </Layout>
    );
}

export default NewsSandBox;