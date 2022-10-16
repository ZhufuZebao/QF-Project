import {useRoutes} from 'react-router-dom'
import NewsSandBox from "../pages/SandBox/NewsSandBox";
import LoginPage from "../pages/Login/LoginPage";
import {Navigate} from 'react-router-dom'
import HomePage from "../pages/Home/HomePage";
import UserListPage from "../pages/userManage/UserList/UserListPage";
import RoleListPage from "../pages/rightManage/RoleList/RoleListPage";
import RightListPage from "../pages/rightManage/RightList/RightListPage";
import NotFondPage from "../pages/NotFond/NotFondPage";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect, useState} from "react";
import {initialize} from "../server/server";
function IndexRouter(props:any) {
    useEffect(() => {
        Promise.all(
            [initialize('/children?pagepermisson=1'),initialize('/rights?pagepermisson=1')]
        ).then(value => {
            let data:string[] = []
            value[0].data.forEach((item:any) => {
                data.push(item.key)
            })
            value[1].data.forEach((item:any) => {
                data.push(item.key)
            })
            setState(data)
        })
    },[])
    const {userInfo:{role:{rights}}} = useSelector((state:RootState) => state.authSlice)
    const [state,setState] = useState<string[]>([])
    const routerList = [
        {
            path:'',
            element:<Navigate to={'/home'}/>
        },
        {
            path:'/home',
            element:<HomePage/>
        },
        {
            path:'/user-manage/list',
            element:<UserListPage/>
        },
        {
            path:'/right-manage/role/list',
            element:<RoleListPage/>
        },
        {
            path:'/right-manage/right/list',
            element:<RightListPage/>
        },
        {
            path:'*',
            element:<NotFondPage/>
        },
    ]
    const GetRouter = () => {
        const routerMiddle = () => {
            return localStorage.getItem('token')?<NewsSandBox/>:<Navigate to={'/login'}/>
        }
        const routes = useRoutes([
            {
                path:'/',
                element:routerMiddle(),
                children: routerList.filter((item) => {
                        if((item.path === '' || item.path === '*' || rights.includes(item.path)) && state.includes(item.path)){
                            return true
                        }
                        return false
                    }),
            },
            {
                path:'/login',
                element:<LoginPage/>
            }
        ])
        return routes
    }

    return (
        <GetRouter/>
    );
}

export default IndexRouter;