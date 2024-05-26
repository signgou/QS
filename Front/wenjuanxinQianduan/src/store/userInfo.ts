import {defineStore} from 'pinia'
import { apiGetOneQn } from '@/apis/getOneQn'
import { apiUserAll } from '@/apis/userAll'
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { ref } from "vue";

export const useUerInfoStore=defineStore('UserInfo',()=>{
    let uid=ref<string>('')
    let qn=ref<string[]>([])
    let id=ref<string>('')
 
    function getAllQn(uid:string){
        apiUserAll(uid).then((res)=>{
            if(res.code=='0019'){
                for(var it of res.data)
                    qn.value.push(it.qnid)
            }
            else{
                alert('获取用户问卷信息失败！')
            }
        })
    }

    function reset()
    {
        uid.value=''
        qn.value=[]
        id.value=''
    }

    return{uid,qn,id,getAllQn,reset}
})