import {defineStore} from 'pinia'

export const useUerInfoStore=defineStore('UserInfo',()=>{
    let id:string=''
    let qn:string[]=[]

    return{id,qn}
})