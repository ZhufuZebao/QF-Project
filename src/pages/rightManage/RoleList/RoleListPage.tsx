import React, {useEffect, useState} from 'react';
import {Button, Table,Modal,Tree} from 'antd'
import {DeleteOutlined,UnorderedListOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {deleteData, initialize, updateData} from "../../../server/server";
import style from "../RightList/RightListPage.module.css";
import {useSelector} from 'react-redux'
import {RootState} from "../../../redux/store";
const {confirm} = Modal

interface roleRightListData {
    id:number,
    data:Array<string>
}
const defaultRoleRightListData:roleRightListData = {
    id:0,
    data:[]
}
function RoleListPage(props:any) {
    let appState = useSelector((state:RootState) => state)
    const {rightList} = appState.globalSlice
    const [dataSource,setDataSource] = useState([])
    const [isModalOpen,setModalOpen] = useState(false)
    const [roleRightList,setRoleRightList] = useState<roleRightListData>(defaultRoleRightListData)
    useEffect(() => {
        initialize('/roles').then(res => {
            if (res.status === 200){
                setDataSource(res.data)
            }
        })
    },[])
    const columns = [
        {
            title:'ID',
            dataIndex:'id',
            render:(id:any) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render:(item:any) => {
                return <div className={style.operationDiv}>
                    <Button type="primary" shape="circle"  icon={<UnorderedListOutlined />} size="large" onClick={() => showRightModule(item)}/>
                    <div style={{width:'20px'}}></div>
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size="large"  danger={true} onClick={() => showPromiseConfirm(item)}/>
                </div>
            }
        }
    ]
    const showRightModule = (item:any) => {
        setRoleRightList({id:item.id,data:item.rights})
        setModalOpen(true)
    }
    const showPromiseConfirm = (item:any) => {
        confirm({
            title: '确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {deleteRole(item)},
            onCancel() {},
        });
    };
    const deleteRole = (item:any) => {
        let newRoleList = dataSource.filter((data:any) => item.id !== data.id)
        deleteData(`/roles/${item.id}`).then(res => {
            if(res.status === 200){
                setDataSource(newRoleList)
            }
        })
    }
    const handleCancel = () => {
        setModalOpen(false)
        setRoleRightList(defaultRoleRightListData)
    }
    const submitRight = () => {
        let newDataSource = [...dataSource]
        newDataSource.map((item:any) => {
            if(item.id === roleRightList.id){
                item.rights = roleRightList.data
            }
            return item
        })
        updateData(`/roles/${roleRightList.id}`,{rights:roleRightList.data}).then(res => {
            if (res.status === 200){
                setDataSource(newDataSource)
                setModalOpen(false)
                setRoleRightList(defaultRoleRightListData)
            }
        })

    }

    return (
        <>
            <Table dataSource={dataSource} columns={columns} rowKey={(item:any) => item.id}/>
            <Modal title="Basic Modal" open={isModalOpen} onOk={submitRight} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkedKeys={roleRightList.data}
                    // @ts-ignore
                    onCheck={(item) => setRoleRightList({...roleRightList,data:item})}
                    treeData={rightList}
                />
            </Modal>
        </>
    );
}

export default RoleListPage;