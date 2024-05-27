import { apiGetOneQn } from "@/apis/getOneQn"
import { oneChoiceP,MoreChoice,FillIn,OPtion } from "@/BasicDataStruct/QuestionType"
import{ref} from 'vue'

export default function(){

    let qt=ref<(oneChoiceP | MoreChoice | FillIn)[]>([])
    let title=ref<string>('')

    async function getAllProblem(qnid:string){
        qt.value=[]
        let res=await apiGetOneQn(qnid)
        // apiGetOneQn(qnid).then((res)=>{
            if(res.code=='0018'){
                // console.log("@@@@@@@@",res)
                
                res.data.forEach((it:any) => {
                    
                    switch(it.type){
                        case 'oneQns':{
                            
                            let question:OPtion[]=[]
                            let n:number=1
                            it.options.forEach((op:any)=> {
                                question.push(new OPtion(n.toString(),op))
                                n=n+1
                            });
                            
                            qt.value.push(new oneChoiceP(it.title,question,it.qid))
                            break;
                        }
                        case 'moreQns':{
                            let question:OPtion[]=[]
                            let n:number=1
                            it.options.forEach((op:any)=> {
                                question.push(new OPtion(n.toString(),op))
                                n=n+1
                            });
                            qt.value.push(new MoreChoice(it.title,question,it.qid))
                            break;
                        }
                        case 'fillQns':{
                            let n:number=1
                            let ans:string[]=[]
                            
                            it.answer.forEach((as:string) => {
                                ans.push(as)
                                n=n+1
                            });
                            qt.value.push(new FillIn(it.title,ans,it.qid))
                            break;
                        }
                        default:
                    }
                });
                // console.log("@@@@@@@",que)
                
            }
            else{
                alert('获取问题信息失败！')               
            }
        // })
    }

    async function getSingleTitle(qnid:string){
        // async function getRes() {return await apiGetOneQn(qnid)}
        
        let res= await apiGetOneQn(qnid)
            if(res.code=='0018')
                {
                    // console.log("@@@@@@@@",res.qnName)
                    title.value = res.qnName
                    // console.log("@@@@@@@@",`"获取了${res.qnName}"`)
                }
            // console.log("********",res.qnName)
            else{title.value =  ''}
        
            // console.log("@@@@@@@@",res)
                   
    }

    return {getAllProblem,getSingleTitle,qt,title}
}