import axios from "axios";

interface insertDataState {
    username:string,
    password:string,
    roleState:boolean,
    region:string,
    roleId:number,
    default:boolean,
}

export function initialize(url:string) {
    return axios.get(`${url}`)
}
export function updateData(url:string,data:any) {
    return axios.patch(`${url}`,data)
}
export function deleteData(url:string) {
    return axios.delete(`${url}`)
}
export function insertData(url:string,data:insertDataState){
    return axios.post(`${url}`,data)
}
export function loginServer(url:string){
    return axios.get(`${url}`)
}
