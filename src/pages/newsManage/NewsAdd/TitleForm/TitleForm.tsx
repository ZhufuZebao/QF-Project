import React, {useEffect, useState} from 'react';
import {Form, FormInstance, Input, Select} from 'antd'
import {initialize} from "../../../../server/server";
const {Option} = Select

interface TitleFormProps {
    titleForm:any
}

function TitleForm({titleForm}:TitleFormProps) {
    useEffect(() => {
        initialize('/categories').then(res => {
            setCategorieList(res.data)
        })
    },[])
    const [categorieList,setCategorieList] = useState([])
    return (
        <Form
            form={titleForm}
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            initialValues={{title:'',categoryId:''}}
        >
            <Form.Item
                label="新闻标题"
                name="title"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="新闻分类"
                name="categoryId"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Select>
                    {
                        categorieList.map((item:any) => {
                            return <Option key={item.id} value={item.id}>{item.value}</Option>
                        })
                    }
                </Select>
            </Form.Item>


        </Form>
    );
}

export default TitleForm;