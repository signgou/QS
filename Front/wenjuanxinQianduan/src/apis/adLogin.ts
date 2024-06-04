// 导入axios实例
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参
interface adminInfoParam {
	adminName: string,
	passWord: string
}

// 获取用户信息
export function apiLoginAdmin(param: adminInfoParam) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/admins/login`,
		method: 'post',
		data: param,
	})
}
