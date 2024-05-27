import {defineStore, skipHydrate} from 'pinia'
import { apiGetOneQn } from '@/apis/getOneQn'
import { apiUserAll } from '@/apis/userAll'
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { ref } from "vue";

export const useUerInfoStore=defineStore('UserInfo',()=>{
    let uid=ref<string>('test')
    let qn=ref<string[]>([])
    let id=ref<string>('test')

    async function getAllQn(uid:string){
        qn.value=[]
        let res =  await apiUserAll(uid)
        // apiUserAll(uid).then((res)=>{
            if(res.code=='0019'){
                for(var it of res.data){
                    // console.log("一个qnid被push\n")
                    qn.value.push(it.qnid)
                }
            }
            else{
                alert('获取用户问卷信息失败！')
            }
        // })
    }

    function reset()
    {
        // uid.value='test'
        qn.value=[]
        // id.value='test'
    }

    

    return{getAllQn,reset,uid,qn,id}
},
{
    persist:true
}
)