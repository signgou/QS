import {defineStore, skipHydrate} from 'pinia'

import { apiUserAll } from '@/apis/userAll'
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { ref } from "vue";

export const useQtOperStore=defineStore('QtOper',()=>{
    let qt=ref<(oneChoiceP | MoreChoice | FillIn)[]>([])

    return{qt}
},
{
    persist:true
}
)