import React, {useEffect, useState} from 'react';
import {PageHeader,Steps,Button,Form,notification,message} from 'antd'
import style from './NewsAddPage.module.css'
import TitleForm from "./TitleForm/TitleForm";
import ContentForm from "./ContentForm/ContentForm";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {insertData} from "../../../server/server";
import {useNavigate,useLocation} from "react-router-dom";
const { Step } = Steps;

function NewsAddPage() {
    useEffect(() => {
        let pathNameList = pathname.split('/')
        if(pathNameList[2] === 'update'){
            setIsUpdate(true)
        }else{
            setIsUpdate(false)
        }
    },[window.location.href])
    var {pathname} = useLocation()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state:RootState) => state.authSlice)
    const [titleForm] = Form.useForm()
    const [isUpdate,setIsUpdate] = useState(false)
    const [current,setCurrent] = useState(0)
    const [titleData,setTitleData] = useState({})
    const [content,setContent] = useState("")
    const back = () => {
        setCurrent(current-1)
    }
    const advance = () => {
        if(current === 0){
            titleForm.validateFields().then(value => {
                setTitleData(value)
                setCurrent(current+1)
            }).catch(e => {
                console.log(e)
            })
        }else{
            if(content === '' || content.trim() === '<p></p>'){
                message.error('新闻内容不能为空');
            }else{
                setCurrent(current+1)
            }

        }
    }
    const submit = (auditState:number) => {
        let data = {
            ...titleData,
            content,
            region: userInfo.region?userInfo.region:'全球',
            author: userInfo.username,
            roleId: userInfo.roleId,
            auditState: auditState,
            publishState: 0,
            createTime: Date.now(),
            star: 0,
            view: 0,
            publishTime: 0
        }
        insertData('/news',data).then(res => {
            auditState?navigate('/audit-manage/list'):navigate('/news-manage/draft')
            notification.info({
                message: `通知`,
                description: `您可以到您的${auditState?'审核列表':'草稿箱'}查看您的新闻`,
                placement:'topRight',
            });
        })
    }
    return (
        <div>
            <PageHeader
                title={isUpdate?"修改新闻":"撰写新闻"}
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或提交审核" />
            </Steps>
            <div className={style.showContent}>
                <div className={current===0?'':style.notShow}>
                    <TitleForm titleForm={titleForm}/>
                </div>
                <div className={current!=1?style.notShow:''}>
                    <ContentForm setContent={setContent}/>
                </div>
                <div className={current===2?'':style.notShow}></div>
            </div>
            <div className={style.showButton}>
                <Button className={current===0?style.notShow:''} onClick={back}>上一步</Button>
                <Button className={current===2?style.notShow:''} type="primary" onClick={advance}>下一步</Button>
                <Button className={current!==2?style.notShow:''} type="primary" onClick={() => submit(0)}>保存草稿箱</Button>
                <Button className={current!==2?style.notShow:''} danger={true} onClick={() => submit(1)}>提交审核</Button>
            </div>
        </div>
    );
}

export default NewsAddPage;