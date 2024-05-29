import { apiGetQt } from "@/apis/getQt"
import { oneChoiceP,MoreChoice,FillIn,OPtion } from "@/BasicDataStruct/QuestionType"
import{ref} from 'vue'

export default function(){

    let qt=ref<(oneChoiceP | MoreChoice | FillIn)[]>([])

    async function getSingleProblem(type:string,qid:string) {
        let res = await apiGetQt(type,qid)
        if(res.code=='0007'){
            
        }
    }

    return {getSingleProblem,qt}
}