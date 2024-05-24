// 删除某个问题
import httpRequest from '@/request/index'

// 定义接口的传参


// 获取用户信息
export function apiDelQt(type:string,qid:string) {
    return httpRequest({
		url: `http://192.168.99.254:3000/api/questionNaires/${type}/${qid}`,
		method: 'del',
		
	})
}
