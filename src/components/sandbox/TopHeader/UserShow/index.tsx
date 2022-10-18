import React from 'react';
import {Dropdown,Menu,Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {logout} from '../../../../redux/reducers/authReducer'
import {clearData} from '../../../../redux/reducers/globalReducer'

function UserShow(props:any) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutFunction = () => {
        dispatch(logout())
        dispatch(clearData())
        navigate('/login')
    }
    const menu = (
        <Menu style={{textAlign:'center'}}
            items={[
                {
                    label: localStorage.getItem('token'),
                    key: '0',
                },
                {
                    label: <a href="https://www.aliyun.com">2nd menu item</a>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: <div onClick={logoutFunction}>退出登录</div>,
                    key: '3',
                    danger:true,
                },
            ]}
        />
    );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Avatar style={{ backgroundColor: '#87d068',cursor:"pointer" }} icon={<UserOutlined />} />
        </Dropdown>
    );
}

export default UserShow;