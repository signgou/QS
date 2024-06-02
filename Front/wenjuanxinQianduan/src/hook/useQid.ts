import { apiDelQt } from "@/apis/delQt";
import { apiModQt } from '@/apis/modQt';
import { ref } from "vue";
import { apiGetQt } from "@/apis/getQt";
import { useError, useSuccess } from "./useAlert";

export async function useQidDelQt(qid:string,type:string) {
    let res = await apiDelQt(type,qid);
    if(res.code.slice(0,1)==="0"){
        useSuccess("删除成功");
    }
    else{
        useError("删除失败");
    }
}


export async function useQidModQt(qid:string,type:string,data:any) {
    let res=await apiModQt(data,type,qid);
    if(res.code.slice(0,1) !== "0"){
        useError("错误，修改失败");
    }
}


export async function useQidGetQt(qid:string,type:string) {
    const title = ref<string>('');
    const options = ref<string[]>([]);
    const selecteds =ref<number[]>([]);
    const ans = ref<string[]>([]);
    let res =await apiGetQt(type,qid);
    if(res.code.slice(0,1) === '0' ){
        title.value=res.data.title;
        if(res.data.qType === 'oneQns' || res.data.qType === 'moreQns'){
            options.value=res.data.options;
            selecteds.value=res.data.selecteds;
        }
        else{
            ans.value= res.data.answer
        }

    }
    else{
        alert(res.msg);
    }

    return {title,options,selecteds,ans};
}