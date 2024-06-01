import { FillIn, MoreChoice, OPtion, QuestionnaireAll, oneChoiceP } from '@/BasicDataStruct/QuestionType';
import {ref} from 'vue';
import { apiGetOneQn } from '@/apis/getOneQn'

export async function useQnidGetAllProblem(qnid:string){
    const qts=ref<(oneChoiceP | MoreChoice | FillIn)[]>([]);
    const qnName =ref<string>('');
    let res=await apiGetOneQn(qnid);
    if(res.code.slice(0,1) === '0'){
    qnName.value=res.qnName;
    res.data.forEach((it:any) => {
    switch(it.type){
        case 'oneQns':{
            let question:OPtion[]=[]
            let n:number=1
            it.options.forEach((op:any)=> {
                question.push(new OPtion(n.toString(),op))
                n=n+1
            });
            let one=new oneChoiceP(it.title,question);
            one.qid=it.qid;
            qts.value.push(one)
        }
        break;
        case 'moreQns':{
            let question:OPtion[]=[]
            let n:number=1
            it.options.forEach((op:any)=> {
                question.push(new OPtion(n.toString(),op))
                n=n+1
            });
            let more=new MoreChoice(it.title,question);
            more.qid=it.qid;
            qts.value.push(more)
        }
        break;
        case 'fillQns':{
            let fill=new FillIn(it.title,'');
            fill.qid=it.qid;
            qts.value.push(fill);
        }
        break;
        default:
            alert("获取失败");
    }
    });
    }
    else{
    alert('获取问题信息失败！')
    }
    return {qts,qnName};
}