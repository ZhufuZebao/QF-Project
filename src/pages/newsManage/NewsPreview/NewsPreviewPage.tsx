import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { Button, Descriptions, PageHeader } from 'antd';
import {initialize} from "../../../server/server";
import {timestampToTime} from "../../../util/function";

function NewsPreviewPage() {
    useEffect(() => {
        initialize(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            setShowData(res.data)
        })
    },[])
    const params = useParams()
    const [showData,setShowData] = useState<any>({})
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
                    <Descriptions.Item label="审核状态">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="发布状态">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="访问数量">{showData.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">{showData.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量">0</Descriptions.Item>

                </Descriptions>
            </PageHeader>
        </div>
    );
}

export default NewsPreviewPage;