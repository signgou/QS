import { apiDelQt } from "@/apis/delQt";

export async function useQidDelQt(qid:string,type:string) {
    let res = await apiDelQt(type,qid);
    if(res.code.slice(0,1)==="0"){
        alert("删除成功");
    }
    else{
        alert("删除失败");
    }
}