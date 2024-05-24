// 导入axios实例
import httpRequest from '@/request/index'

// 定义接口的传参


// 获取用户信息
export function apiGetOneQn(qnid:string) {
    return httpRequest({
		url: `http://192.168.99.254:3000/api/questionNaires/${qnid}`,
		method: 'get',
		
	})
}
