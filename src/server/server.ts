import axios from "axios";


const default_url = 'http://localhost:8000'

interface insertDataState {
    username:string,
    password:string,
    roleState:boolean,
    region:string,
    roleId:number,
    default:boolean,
}

export function initialize(url:string) {
    return axios.get(`${default_url}${url}`)
}
export function updateData(url:string,data:any) {
    return axios.patch(`${default_url}${url}`,data)
}
export function deleteData(url:string) {
    return axios.delete(`${default_url}${url}`)
}
export function insertData(url:string,data:insertDataState){
    return axios.post(`${default_url}${url}`,data)
}
export function loginServer(url:string){
    return axios.get(`${default_url}${url}`)
}
