import React from 'react';
import {Form, FormInstance, Input, Select} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
const {Option} = Select
interface FormModuleProps {
    form:FormInstance<any>,
    regionDisable:boolean,
    setRegionDisable:(data:boolean) => void,
    editUserData?:object
}

const defaultFormData = {
    username:'',
    password:'',
    region:'',
    roleId:''
}

function FormModule({form,regionDisable,setRegionDisable}:FormModuleProps) {
    const AppState = useSelector((state:RootState) => state)
    const {regionList,roleList} = AppState.globalSlice
    return (
        <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={defaultFormData}
            onValuesChange={(item) => {
                if(item.roleId){
                    if(item.roleId === 1){
                        setRegionDisable(true)
                        form.setFieldValue('region','')
                    }else{
                        setRegionDisable(false)
                    }

                }
            }}
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
                rules={regionDisable?[]:[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select disabled={regionDisable}>
                    {regionList.map((item:any) => {
                        return <Option key={item.id} value={item.title}>{item.value}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
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
    );
}

export default FormModule;