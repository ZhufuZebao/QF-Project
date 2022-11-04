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
import Loading from "../components/loading";
import NewsAddPage from "../pages/newsManage/NewsAdd/NewsAddPage";
import NewsDraftPage from "../pages/newsManage/NewsDraft/NewsDraftPage";
import NewsPreviewPage from "../pages/newsManage/NewsPreview/NewsPreviewPage";
import NewsUpdatePage from "../pages/newsManage/NewsUpdate/NewsUpdatePage";
function IndexRouter(props:any) {
    useEffect(() => {
        Promise.all(
            [initialize('/children?pagepermisson=1'),initialize('/children?routepermisson=1'),initialize('/rights?pagepermisson=1')]
        ).then(value => {
            let data:string[] = []
            value[0].data.forEach((item:any) => {
                data.push(item.key)
            })
            value[1].data.forEach((item:any) => {
                data.push(item.key)
            })
            value[2].data.forEach((item:any) => {
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
            path:'/news-manage/add',
            element:<NewsAddPage/>
        },
        {
            path:'/news-manage/draft',
            element:<NewsDraftPage/>
        },
        {
            path:'/news-manage/preview/:id',
            element:<NewsPreviewPage/>
        },
        {
          path:'/news-manage/update/:id',
          element:<NewsAddPage/>
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
                children:routerList.filter((item) => {
                        if(item.path === '' || item.path === '*'){
                            return true
                        }
                        if(rights.includes(item.path) && state.includes(item.path)){
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
        state.length > 0?<GetRouter/>:<Loading/>
    );
}

export default IndexRouter;