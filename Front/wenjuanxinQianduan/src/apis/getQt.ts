// 获取某个问卷的某个问题信息
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参


// 获取用户信息
export function apiGetQt(type:string,qid:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${type}/${qid}`,
		method: 'get',
		
	})
}
