import React, {useState} from 'react';
import {PageHeader,Steps} from 'antd'
import style from './NewsAddPage.module.css'
const { Step } = Steps;

function NewsAddPage() {
    const [current,setCurrent] = useState(0)
    return (
        <div>
            <PageHeader
                title="撰写新闻"
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或提交审核" />
            </Steps>
        </div>
    );
}

export default NewsAddPage;