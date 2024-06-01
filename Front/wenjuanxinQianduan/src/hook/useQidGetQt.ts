import { ref } from "vue";
import { apiGetQt } from "@/apis/getQt";

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