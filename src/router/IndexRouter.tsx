import {useRoutes} from 'react-router-dom'
import NewsSandBox from "../pages/SandBox/NewsSandBox";
import LoginPage from "../pages/Login/LoginPage";
import {Navigate} from 'react-router-dom'
import HomePage from "../pages/Home/HomePage";
import UserListPage from "../pages/userManage/UserList/UserListPage";
import RoleListPage from "../pages/rightManage/RoleList/RoleListPage";
import RightListPage from "../pages/rightManage/RightList/RightListPage";
import index from "@babel/generator";
function IndexRouter(props:any) {
    const GetRouter = () => {
        const routerMiddle = () => {
            return localStorage.getItem('token')?<NewsSandBox/>:<Navigate to={'/login'}/>
        }
        const routes = useRoutes([
            {
                path:'/',
                element:routerMiddle(),
                children:[
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
                ]
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