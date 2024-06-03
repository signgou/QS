// 增加单选、多选、填空题
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参
interface ChooseInfoParam {
	title:string,
    options?:string[],
    selecteds?:number[],
}

interface FillInfoParam {
	title:string,
    ans?:string[]
}

// 获取用户信息
export function apiAddOne(param: ChooseInfoParam,qnid:string,type:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${type}/${qnid}`,
		method: 'post',
		data: param,
	})
}

export function apiAddMut(param: ChooseInfoParam,qnid:string,type:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${type}/${qnid}`,
		method: 'post',
		data: param,
	})
}

export function apiAddFill(param: FillInfoParam,qnid:string,type:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${type}/${qnid}`,
		method: 'post',
		data: param,
	})
}