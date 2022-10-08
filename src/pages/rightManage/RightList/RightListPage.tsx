import React, {useEffect, useState} from 'react';
import {Button, Table, Tag,Popover,Switch,Modal} from 'antd'
import {EditOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {deleteData, initialize, updataData} from "../../../server/server";
import style from './RightListPage.module.css'
const {confirm} = Modal

function RightListPage(props:any) {
    useEffect(() => {
        initialize('/rights?_embed=children').then(res => {
            let data = res.data
            data.forEach((item:any) => {
                if (item.children.length === 0){
                    item.children = ''
                }
            })
            setDataSource(data)
        })
    },[])

    const [dataSource,setDataSource] = useState([])

    const changeRight = (item:any) => {
        item.pagepermisson = item.pagepermisson?0:1
        if(item.grade === 1){
            updataData(`/rights/${item.id}`,{pagepermisson:item.pagepermisson}).then(res => {
                if(res.status === 200){
                    setDataSource([...dataSource])
                }

            })
        }else{
            updataData(`/children/${item.id}`,{pagepermisson:item.pagepermisson}).then(res => {
                if(res.status === 200){
                    setDataSource([...dataSource])
                }
            })
        }
    }
    const deleteRight = (item:any) => {
        if(item.grade === 1){
            let newDataSource = dataSource.filter((data:any) => data.id !== item.id)
            deleteData(`/rights/${item.id}`).then(res => {
                if(res.status === 200){
                    setDataSource(newDataSource)
                }
            })

        }else{
            let newDataSource = dataSource.filter((data:any) => data.id === item.rightId)
            // @ts-ignore
            newDataSource[0].children = newDataSource[0].children.filter((data:any) => data.id !== item.id)
            deleteData(`/children/${item.id}`).then(res => {
                if(res.status === 200){
                    setDataSource([...dataSource])
                }
            })
        }
    }
    const showPromiseConfirm = (item:any) => {
        confirm({
            title: '确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {deleteRight(item)},
            onCancel() {},
        });
    };

    const columns = [
        {
            title: '权限名称',
            dataIndex: 'title',
            render: (title:any) => {
                return <b>{title}</b>
            }
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key:any) => {
                return <Tag color={"orange"}>{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item:any) => {
                return <div className={style.operationDiv}>
                    <Popover
                        content={
                            <div style={{textAlign:"center"}}>
                                <Switch checked={item.pagepermisson} onChange={() =>changeRight(item)}/>
                            </div>
                        }
                        title="是否显示"
                        trigger={(item.pagepermisson === 1 || item.pagepermisson === 0)?'click':''}
                    >
                        <Button type="primary" shape="circle" disabled={!(item.pagepermisson === 1 || item.pagepermisson === 0)} icon={<EditOutlined />} size="large" />
                    </Popover>
                    <div style={{width:'20px'}}></div>
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size="large"  danger={true} onClick={() => showPromiseConfirm(item)}/>
                </div>
            }
        },
    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}/>
        </div>
    );
}

export default RightListPage;