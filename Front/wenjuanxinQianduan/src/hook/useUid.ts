import {ref} from 'vue';
import {apiUserAll} from '@/apis/userAll';
import { apiDelUser } from '@/apis/delUser';
import { useError, useSuccess } from "./useAlert";

export async function useUidGetQn(uid:string){
    const qnids = ref<string[]>([]);
    const qnNames = ref<string[]>([]);
    const userName=ref<string>('');
    let res =await apiUserAll(uid);
    if(res.code.slice(0,1) === '0'){
        userName.value=res.userName;
        res.data.forEach(qn => {
            qnids.value.push(qn.qnid);
            qnNames.value.push(qn.qnName);
        })
    }
    else{
        useError("用户获取失败");
    }
    return {userName,qnids,qnNames};
}

export async function useUidDelUser(uid:string) {
    let res = await apiDelUser(uid);
    if(res.code.slice(0,1)==="0"){
        useSuccess("删除成功");
    }
    else{
        useError("删除失败");
    }
}