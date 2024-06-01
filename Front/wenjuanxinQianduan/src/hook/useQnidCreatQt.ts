import {ref} from 'vue';
import {apiAddOne,apiAddMut,apiAddFill} from '@/apis/addQt'
import { QuestionnaireAll, oneChoiceP, MoreChoice, FillIn, OPtion } from '@/BasicDataStruct/QuestionType';

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
                alert("创建成功");
            }
            else{
                alert("创建失败");
            }
            break;
        case "moreQns":
            let moreRes= await apiAddMut(data,qnid,type);
            if(moreRes.code.slice(0,1)=="0"){
                qid.value=moreRes.data.qid;
                alert("创建成功");
            }
            else{
                alert("创建失败");
            }
            break;
        case "fillQns":
            let fillRes= await apiAddFill(data,qnid,type);
            if(fillRes.code.slice(0,1)=="0"){
                qid.value=fillRes.data.qid;
                alert("创建成功");
            }
            else{
                alert("创建失败");
            }
            break;
        default:
            alert("创建失败");
    }

    return qid;
}