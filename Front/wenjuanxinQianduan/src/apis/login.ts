// 导入axios实例
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参
interface UserInfoParam {
	userName: string,
	passWord: string
}

// 获取用户信息
export function apiGetUserInfo(param: UserInfoParam) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/users/login`,
		method: 'post',
		data: param,
	})
}
