import {defineStore, skipHydrate} from 'pinia'

import { apiUserAll } from '@/apis/userAll'
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { ref } from "vue";

export const useQnOperStore=defineStore('UserInfo',()=>{
    let qnid=ref<string>('')



    return{qnid}
},
{
    persist:true
}
)