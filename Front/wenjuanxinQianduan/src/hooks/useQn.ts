import { apiGetOneQn } from "@/apis/getOneQn"
import { oneChoiceP,MoreChoice,FillIn,OPtion } from "@/BasicDataStruct/QuestionType"

export default function(){

    function getAllProblem(qnid:string):(oneChoiceP | MoreChoice | FillIn)[]{
        async function getRes()
        {
            return await apiGetOneQn(qnid)
        }
        let res=getRes()
        // apiGetOneQn(qnid).then((res)=>{
            if(res.code=='0018'){
                console.log("@@@@@@@@",res)
                let que: (oneChoiceP | MoreChoice | FillIn)[]=[]
                res.data.forEach((it:any) => {
                    
                    switch(it.type){
                        case 'oneQns':{
                            let question:OPtion[]=[]
                            let n:number=1
                            it.options.forEach((op:any)=> {
                                question.push(new OPtion(n.toString(),op))
                                n=n+1
                            });
                            que.push(new oneChoiceP(it.title,question))
                        }
                        case 'moreQns':{
                            let question:OPtion[]=[]
                            let n:number=1
                            it.options.forEach((op:any)=> {
                                question.push(new OPtion(n.toString(),op))
                                n=n+1
                            });
                            que.push(new MoreChoice(it.title,question))
                        }
                        case 'fillQns':{
                            let n:number=1
                            let ans:string[]=[]
                            it.answer.forEach((as:any) => {
                                ans.push(as)
                                n=n+1
                            });
                            que.push(new FillIn(it.title,ans))
                        }
                        default:
                    }
                });
                console.log("@@@@@@@",que)
                return que
            }
            else{
                // alert('获取问题信息失败！')
                return []
            }
        // })
    }

    function getSingleTitle(qnid:string):string{
        let res = async ()=>{return await apiGetOneQn(qnid)}
        
            // console.log("@@@@@@@@",res)
            if(res.code=='0018')
                {
                    // console.log("@@@@@@@@",res.qnName)
                    return res.qnName
                }
            return ''
        
    }

    return {getAllProblem,getSingleTitle}
}