import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { Button, Descriptions, PageHeader } from 'antd';
import {initialize} from "../../../server/server";
import {timestampToTime} from "../../../util/function";
import style from './NewsPreviewPage.module.css'

function NewsPreviewPage() {
    useEffect(() => {
        initialize(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            console.log(res.data)
            setShowData(res.data)
        })
    },[])
    const params = useParams()
    const [showData,setShowData] = useState<any>({})
    const auditList = ['未审核','审核中','已通过','未通过']
    const publicList = ['未发布','待发布','已上线','已下线']
    return (
        <div>
            <PageHeader
                onBack={() => window.history.back()}
                title={showData.title}
                subTitle={showData?.category?.value}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{showData.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{timestampToTime(showData.createTime)}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{showData.publishTime?timestampToTime(showData.publishTime):'-'}</Descriptions.Item>
                    <Descriptions.Item label="区域">{showData.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态" style={{color:"red",fontWeight:600}}>{auditList[showData.auditState]}</Descriptions.Item>
                    <Descriptions.Item label="发布状态" style={{color:"red",fontWeight:600}}>{publicList[showData.publishState]}</Descriptions.Item>
                    <Descriptions.Item label="访问数量" style={{color:"green"}}>{showData.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量" style={{color:"green"}}>{showData.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量" style={{color:"green"}}>0</Descriptions.Item>
                </Descriptions>
            </PageHeader>
          <div dangerouslySetInnerHTML={{__html:showData.content}} className={style.showContent}></div>
        </div>
    );
}

export default NewsPreviewPage;