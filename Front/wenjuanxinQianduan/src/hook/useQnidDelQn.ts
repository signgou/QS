import { apiDelQn } from "@/apis/delQn";

export async function useQnidDelQn(qnid:string) {
    let res = await apiDelQn(qnid);
    if(res.code.slice(0,1) !== "0"){
        alert(res.msg);
    }
}