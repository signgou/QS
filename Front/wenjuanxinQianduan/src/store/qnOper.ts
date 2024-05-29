import {defineStore, skipHydrate} from 'pinia'

import { apiUserAll } from '@/apis/userAll'
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { ref } from "vue";

export const useQnOperStore=defineStore('QnOper',()=>{
    let qnid=ref<string>('')
    let index=ref<number>(0)
    

    return{qnid,index}
},
{
    persist:true
}
)