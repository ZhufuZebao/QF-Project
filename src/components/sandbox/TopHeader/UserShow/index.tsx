import React from 'react';
import {Dropdown,Menu,Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons';

function UserShow(props:any) {
    const menu = (
        <Menu
            items={[
                {
                    label: <a href="https://www.antgroup.com">1st menu item</a>,
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
                    label: '退出登录',
                    key: '3',
                    danger:true
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