// 导入axios实例
import httpRequest from '@/request/index'

// 定义接口的传参
interface UserInfoParam {
	userName: string,
	passWord: string
}

// 获取用户信息
export function apiGetUserInfo(param: UserInfoParam) {
    return httpRequest({
		url: 'http://192.168.99.254:3000/api/users/login',
		method: 'post',
		data: param,
	})
}
