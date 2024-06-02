// 删除某个问题
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参


// 获取用户信息
export function apiDelQt(type:string,qid:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/questionNaires/${type}/${qid}`,
		method: 'delete',
		
	})
}
