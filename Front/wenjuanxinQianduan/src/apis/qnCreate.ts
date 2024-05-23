// 导入axios实例
import httpRequest from '@/request/index'

// 定义接口的传参
interface UserInfoParam {
	uid:string
}

// 获取用户信息
export function apiQnCreate(param: UserInfoParam) {
    return httpRequest({
		url: 'http://192.168.99.254:3000/api/users/questionNaires',
		method: 'post',
		data: param,
	})
}
