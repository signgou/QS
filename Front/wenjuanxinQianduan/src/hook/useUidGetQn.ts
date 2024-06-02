import {ref} from 'vue';
import {apiUserAll} from '@/apis/userAll';

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

    return {userName,qnids,qnNames};
}
