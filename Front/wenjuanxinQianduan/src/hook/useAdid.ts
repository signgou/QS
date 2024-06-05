import { ref } from "vue";
import { apiGetUsers } from "@/apis/getUsers";
import { useError } from "./useAlert";


export async function useGetUser(){
    const uids = ref<string[]>([]);
    const useNames = ref<string[]>([]);
    const qnNums = ref<number[]>([]);
    let res =await apiGetUsers();
    if(res.code[0] === '0'){
       
        res.data.forEach(user => {
            uids.value.push(user.uid);
            useNames.value.push(user.userName);
            qnNums.value.push(user.qnNum);
        })
    }
    else{
        useError("获取用户信息");
    }
    return {uids,useNames,qnNums};
}