// 导入axios实例
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参
interface AdminInfoParam {
	adminName: string,
	passWord: string,
    SecretKey: string
}

// 获取用户信息
export function apiReAdmin(param: AdminInfoParam) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/admins/register`,
		method: 'post',
		data: param,
	})
}
