import {defineStore, skipHydrate} from 'pinia'

import { apiUserAll } from '@/apis/userAll'
import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import { ref,toRefs } from "vue";
import useQn from '@/hooks/useQn';
import { useQnOperStore } from './qnOper';
const qnOperStore=useQnOperStore()
let {qt,getAllProblem}= useQn()

export const useQtOperStore=defineStore('QtOper',()=>{
    let qtt=ref<(oneChoiceP | MoreChoice | FillIn)[]>([])

    async function getQt()
    {
        await getAllProblem(qnOperStore.qnid)
        qtt.value=qt.value
    }

    return{qtt,getQt}
},
{
    persist:true
}
)