// 获取的某一问卷所有信息
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参


// 获取用户信息
export function apiGetOneQn(qnid:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${qnid}`,
		method: 'get',
		
	})
}
