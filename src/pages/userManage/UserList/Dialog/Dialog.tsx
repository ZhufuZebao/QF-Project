import React from 'react';
import {Modal,Form,Input,Select} from 'antd'
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
const { Option } = Select;

interface DialogProps {
    open:boolean,
    changeOpen:(data:boolean)=>void
}

function Dialog({open,changeOpen}:DialogProps) {
    const AppState = useSelector((state:RootState) => state)
    const  {regionList,roleList} = AppState.globalSlice
    const [form] = Form.useForm()
    return (
        <Modal
            open={open}
            title="添加用户"
            okText="确认"
            cancelText="取消"
            onCancel={() => {changeOpen(false)}}
            onOk={() => {
                form.validateFields().then(res =>{
                    console.log(res)
                }).catch(e => {
                    console.log(e)
                })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{}}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input type="password"/>
                </Form.Item>
                <Form.Item
                    name="region"
                    label="区域"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Select>
                        {regionList.map((item:any) => {
                            return <Option key={item.id} value={item.title}>{item.value}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="role"
                    label="角色"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Select>
                        {roleList.map((item:any)  => {
                            return  <Option key={item.id} value={item.roleType}>{item.roleName}</Option>
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default Dialog;