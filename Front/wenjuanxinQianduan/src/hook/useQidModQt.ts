import {ref} from 'vue';
import { apiModQt } from '@/apis/modQt';

export async function useQidModQt(qid:string,type:string,data:any) {
    let res=await apiModQt(data,type,qid);
    if(res.code.slice(0,1) === "1"){
        alert("错误，修改失败");
    }
}