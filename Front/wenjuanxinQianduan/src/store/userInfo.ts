import {defineStore} from 'pinia'
import { apiGetOneQn } from '@/apis/getOneQn'
import { apiUserAll } from '@/apis/userAll'

export const useUerInfoStore=defineStore('UserInfo',()=>{
    let uid:string='test'
    let qn:string[]=[]
    let id:string='test'

    function getAllProblem(qnid:string){
        apiGetOneQn(qnid).then((res)=>{
            if(res.code=='0018'){
                alert('获取问题信息成功！')
                
            }
            else{
                alert('获取问题信息失败！')
            }
        })
    }

    function getAllQn(uid:string){
        apiUserAll(uid).then((res)=>{
            if(res.code=='0019'){
                for(var it of res.data)
                qn.push(it.qnid)
            }
            else{
                alert('获取用户问卷信息失败！')
            }
        })
    }

    function reset()
    {
        uid='test'
        qn=[]
        id='test'
    }

    return{uid,qn,id,getAllProblem,getAllQn,reset}
})