import React, {useEffect, useState} from 'react';
import {Table,Switch,Button,Modal} from 'antd'
import {initialize} from "../../../server/server";
import style from '../../rightManage/RightList/RightListPage.module.css'
import {DeleteOutlined,ExclamationCircleOutlined,EditOutlined,PlusOutlined} from '@ant-design/icons'
import Dialog from "./Dialog/Dialog";
const {confirm} = Modal
function UserListPage(props:any) {
    useEffect(() => {
        initialize('/users?_expand=role').then(res => {
            console.log(res.data)
            setDataSource(res.data)
        })
    },[])
    const [dataSource,setDataSource] = useState([])
    const [showDialog,setShowDialog] = useState(false)

    const showPromiseConfirm = (item:any) => {
        confirm({
            title: '确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {},
            onCancel() {},
        });
    };
    const columns = [
        {
            dataIndex:'region',
            title:'区域',
            render:(region:string) => {
                return <b>{region === ''?'全球':region}</b>
            }
        },
        {
            dataIndex: 'role',
            title:'角色名称',
            render:(role:any) => {
                return role.roleName
            }
        },
        {
            dataIndex: 'username',
            title:'用户名'
        },
        {
            dataIndex: 'roleState',
            title:'用户状态',
            render:(roleState:any,item:any) => {
                return <Switch disabled={item.default} checked={roleState}/>
            }
        },
        {
            title:'操作',
            render: (item:any) => {
                return <div className={style.operationDiv}>
                    <Button type="primary" shape="circle" disabled={item.default}  icon={<EditOutlined />} size="large" onClick={() => alert(111)}/>
                    <div style={{width:'20px'}}></div>
                    <Button type="primary" shape="circle" disabled={item.default} icon={<DeleteOutlined />} size="large"  danger={true} onClick={() => showPromiseConfirm(item)}/>
                </div>
            }
        },
    ]
    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} style={{marginBottom:'15px'}} onClick={() => setShowDialog(true)}>
                添加用户
            </Button>
            <Table dataSource={dataSource} columns={columns} rowKey={(item:any) => item.id} pagination={{pageSize:7}}/>
            <Dialog open={showDialog} changeOpen={setShowDialog}/>
        </div>
    );
}

export default UserListPage;