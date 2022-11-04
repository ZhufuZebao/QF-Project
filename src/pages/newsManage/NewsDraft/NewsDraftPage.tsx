import React, {useEffect, useState} from 'react';
import {Button, Table,Modal} from 'antd'
import {EditOutlined,DeleteOutlined,VerticalAlignTopOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {deleteData, initialize} from "../../../server/server";
import {useSelector} from "react-redux";
import {Link,useNavigate} from 'react-router-dom'
import {RootState} from "../../../redux/store";
import style from "../../rightManage/RightList/RightListPage.module.css";
const {confirm} = Modal

function NewsDraftPage() {
    useEffect(() => {
        initialize(`/news?auditState=0&author=${username}&_expand=category`).then(res => {
            console.log(res.data)
            setDataSource(res.data)
        })
    },[])
    const {userInfo:{username}} = useSelector((state:RootState) => state.authSlice)
    const [dataSource,setDataSource] = useState([])
    const navigate = useNavigate()
    const columns = [
        {
            title:'新闻标题',
            dataIndex:'title',
            render:(title:string,item:any) => {
                return <Link to={`/news-manage/preview/${item.id}`}>{title}</Link>
            }
        },
        {
            title:'作者',
            dataIndex:'author',
        },
        {
            title:'新闻分类',
            dataIndex:'category',
            render:(category:any) => {
                return category.value
            }
        },
        {
            title:'操作',
            render:(item:any) => {
                return <div className={style.operationDiv}>
                    <Button shape="circle"
                            icon={<EditOutlined />}
                            size="large"
                            onClick={() => navigate(`/news-manage/update/${item.id}`)}/>
                    <div style={{width:'20px'}}></div>
                    <Button shape="circle" icon={<DeleteOutlined />} size="large"  danger={true} onClick={() => showPromiseConfirm(item)}/>
                    <div style={{width:'20px'}}></div>
                    <Button type="primary" shape="circle" icon={<VerticalAlignTopOutlined />} size="large" onClick={() => 111}/>
                </div>
            }
        },
    ]
    const showPromiseConfirm = (item:any) => {
        confirm({
            title: '确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {deleteNewsDraft(item)},
            onCancel() {},
        });
    };
    const deleteNewsDraft = (item:any) => {
        deleteData(`/news/${item.id}`).then(res => {
            let newDataSource = dataSource.filter((data:any) => data.id !== item.id)
            setDataSource(newDataSource)
        })
    }
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(item:any) => item.id}
            pagination={{pageSize:9}}/>
    );
}

export default NewsDraftPage;