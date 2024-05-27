// 增加单选、多选、填空题
import httpRequest from '@/request/index'

// 定义接口的传参
interface ChooseInfoParam {
	title:string,
    options:string[],
    selecteds:number[],
}

interface FillInfoParam {
	title:string,
    ans:string[]
}

// 获取用户信息
export function apiAddOne(param: ChooseInfoParam,type:string,qnid:string) {
    return httpRequest({
		url: `http://192.168.99.254:3000/api/questionNaires/${type}/${qnid}`,
		method: 'post',
		data: param,
	})
}

export function apiAddMut(param: ChooseInfoParam,type:string,qnid:string) {
    return httpRequest({
		url: `http://192.168.99.254:3000/api/questionNaires/${type}/${qnid}`,
		method: 'post',
		data: param,
	})
}

export function apiAddFill(param: FillInfoParam,type:string,qnid:string) {
    return httpRequest({
		url: `http://192.168.99.254:3000/api/questionNaires/${type}/${qnid}`,
		method: 'post',
		data: param,
	})
}