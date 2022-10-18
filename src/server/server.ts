import axios from "axios";


export function initialize(url:string) {
    return axios.get(`${url}`)
}
export function updateData(url:string,data:any) {
    return axios.patch(`${url}`,data)
}
export function deleteData(url:string) {
    return axios.delete(`${url}`)
}
export function insertData(url:string,data:any){
    return axios.post(`${url}`,data)
}
export function loginServer(url:string){
    return axios.get(`${url}`)
}
