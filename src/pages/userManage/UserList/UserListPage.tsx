import React, {useEffect, useState} from 'react';
import {Table,Switch,Button,Modal} from 'antd'
import {deleteData, initialize, updateData} from "../../../server/server";
import style from '../../rightManage/RightList/RightListPage.module.css'
import {DeleteOutlined,ExclamationCircleOutlined,EditOutlined,PlusOutlined} from '@ant-design/icons'
import Dialog from "./Dialog/Dialog";
const {confirm} = Modal
function UserListPage(props:any) {
    useEffect(() => {
        initialize('/users?_expand=role').then(res => {
            setDataSource(res.data)
        })
    },[])
    const [dataSource,setDataSource] = useState([])
    const [showDialog,setShowDialog] = useState(false)
    const [showEditDialog,setShowEditDialog] = useState(false)
    const [editUserData,setEditUserData] = useState({})

    const showPromiseConfirm = (item:any) => {
        confirm({
            title: '确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                delUser(item)
            },
            onCancel() {},
        });
    };
    const delUser = (item:any) => {
        deleteData(`/users/${item.id}`).then(res => {
            let newDataSoure = dataSource.filter((data:any) => item.id !== data.id)
            setDataSource([...newDataSoure])
        })
    }
    const changeUserRoleState = (item:any) => {
        updateData(`/users/${item.id}`,{roleState:!item.roleState}).then(res => {
            let newDataSoure = [...dataSource]
            newDataSoure.map((data:any) => {
                if(item.id === data.id){
                    data.roleState = !data.roleState
                }
                return data
            })
            setDataSource(newDataSoure)
        })
    }
    const editUserInformation = (item:any) => {
        setEditUserData(item)
        setShowEditDialog(true)

    }
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
                return <Switch disabled={item.default} checked={roleState} onChange={() => changeUserRoleState(item)}/>
            }
        },
        {
            title:'操作',
            render: (item:any) => {
                return <div className={style.operationDiv}>
                    <Button type="primary" shape="circle" disabled={item.default}  icon={<EditOutlined />} size="large" onClick={() => editUserInformation(item)}/>
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
            <Dialog open={showDialog}
                    changeOpen={setShowDialog}
                    showEditDialog={showEditDialog}
                    setShowEditDialog={setShowEditDialog}
                    dataSource={dataSource}
                    setDataSource={setDataSource}
                    editUserData={editUserData}
                    setEditUserData={setEditUserData}
            />
        </div>
    );
}

export default UserListPage;