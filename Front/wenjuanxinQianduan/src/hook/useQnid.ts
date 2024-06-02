import {ref} from 'vue';
import {apiAddOne,apiAddMut,apiAddFill} from '@/apis/addQt';
import { apiDelQn } from "@/apis/delQn";
import {  oneChoiceP, MoreChoice, FillIn, OPtion } from '@/BasicDataStruct/QuestionType';
import { apiGetOneQn } from '@/apis/getOneQn'
import {useSuccess,useError} from '@/hook/useAlert';

export async function useQnidCreateQt(qnid:string,type:string,title:string){
    const qid=ref<string>("");
    let data={
        title : title
    }
    switch(type){
        case "oneQns":
    
            let oneRes= await apiAddOne(data,qnid,type);
            if(oneRes.code.slice(0,1)=="0"){
                qid.value=oneRes.data.qid;
                useSuccess("单选题创建成功");
            }
            else{
                useError("单选题创建失败");
            }
            break;
        case "moreQns":
            let moreRes= await apiAddMut(data,qnid,type);
            if(moreRes.code.slice(0,1)=="0"){
                qid.value=moreRes.data.qid;
                useSuccess("多选题创建成功");
            }
            else{
                useError("多选题创建失败");
            }
            break;
        case "fillQns":
            let fillRes= await apiAddFill(data,qnid,type);
            if(fillRes.code.slice(0,1)=="0"){
                qid.value=fillRes.data.qid;
                useSuccess("填空题创建成功");
            }
            else{
                useError("填空题创建失败");
            }
            break;
        default:
            useError("创建失败");
    }

    return qid;
}




export async function useQnidDelQn(qnid:string) {
    let res = await apiDelQn(qnid);
    if(res.code.slice(0,1) !== "0"){
        useError("删除失败");
    }
    else{
        useSuccess(res.msg);
    }
}




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



export async function useQnidGetShow(qnid:string){
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
                let option=new OPtion(n.toString(),op);
                option.selectedNum = it.selecteds[n-1];
                question.push(option);
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
                let option=new OPtion(n.toString(),op);
                option.selectedNum = it.selecteds[n-1];
                question.push(option);
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
            fill.answers=it.answer;
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