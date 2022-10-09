import axios from "axios";


const default_url = 'http://localhost:8000'

export function initialize(url:string) {
    return axios.get(`${default_url}${url}`)
}
export function updateData(url:string,data:any) {
    return axios.patch(`${default_url}${url}`,data)
}
export function deleteData(url:string) {
    return axios.delete(`${default_url}${url}`)
}