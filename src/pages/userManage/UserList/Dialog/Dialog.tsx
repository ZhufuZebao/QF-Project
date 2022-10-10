import React, {useEffect, useState} from 'react';
import {Modal,Form} from 'antd'
import FormModule from "../FormModule/FormModule";
import {insertData, updateData} from "../../../../server/server";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

interface DialogProps {
    open:boolean,
    changeOpen:(data:boolean)=>void,
    showEditDialog:boolean,
    setShowEditDialog:(data:boolean)=>void,
    dataSource:Array<any>,
    setDataSource:(data:any) => void,
    editUserData:any,
    setEditUserData:(data:object) =>void
}

function Dialog({open,changeOpen,showEditDialog,setShowEditDialog,dataSource,setDataSource,editUserData,setEditUserData}:DialogProps) {
    const [form] = Form.useForm()
    const [editForm] = Form.useForm()
    const [regionDisable,setRegionDisable] = useState(false)
    const AppState = useSelector((state:RootState) => state)
    const {roleList} = AppState.globalSlice
    useEffect(() => {
        if(showEditDialog){
            setRegionDisable(editUserData.roleId === 1?true:false)
            editForm.setFieldsValue(editUserData)
        }
    },[showEditDialog])
    const handleCancel = () => {
        changeOpen(false)
        form.resetFields()
        setRegionDisable(false)
    }
    const editCancel = () => {
        setShowEditDialog(false)
        setEditUserData({})
        editForm.resetFields()
        setRegionDisable(false)
    }
    const insertSubmit = () => {
        form.validateFields().then(res =>{
            insertData('/users',{
                ...res,
                roleState:true,
                default:false,
            }).then(response => {
                let newDataSource = [...dataSource]
                newDataSource.push({...response.data,role:roleList.filter((item:any) => item.id === res.roleId)[0]})
                setDataSource([...newDataSource])
                changeOpen(false)
                setRegionDisable(false)
                form.resetFields()
            })
        }).catch(e => {
            console.log(e)
        })
    }
    const editSubmit = () => {
        editForm.validateFields().then(value => {
            console.log(value,editUserData)
            updateData(`/users/${editUserData.id}`,{
                default:editUserData.default,
                password:value.password,
                region:value.region,
                roleId:value.roleId,
                roleState:editUserData.roleState,
                username:value.username,
            }).then(res => {
                let newData = res.data
                newData.role = roleList.filter((item:any) => item.id === newData.roleId)[0]
                let newDataSoure = [...dataSource]
                for(let i =0;i<newDataSoure.length;i++){
                    if(newDataSoure[i].id === newData.id){
                        newDataSoure[i] = newData
                    }
                }
                setDataSource([...newDataSoure])
                setShowEditDialog(false)
                setEditUserData({})
                setRegionDisable(false)
                editForm.resetFields()

            })
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <>
            <Modal
                open={open}
                title="添加用户"
                okText="确认"
                cancelText="取消"
                onCancel={handleCancel}
                onOk={insertSubmit}
            >
                <FormModule form={form} regionDisable={regionDisable} setRegionDisable={setRegionDisable}/>
            </Modal>
            <Modal
                open={showEditDialog}
                title="编辑用户"
                okText="编辑"
                cancelText="取消"
                onCancel={editCancel}
                onOk={editSubmit}
            >
                <FormModule form={editForm} regionDisable={regionDisable} setRegionDisable={setRegionDisable} editUserData={editUserData}/>
            </Modal>
        </>
    );
}

export default Dialog;