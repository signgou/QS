// 修改某个问题
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参
interface QtMod {
	title?:string,
    options?:string[],
    selecteds?:number[],
    ans?:string[]
}

// 获取用户信息
export function apiModQt(param:QtMod,type:string,qid:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${type}/${qid}`,
		method: 'patch',
		data: param,
	})
}
