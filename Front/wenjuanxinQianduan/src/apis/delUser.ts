// 删除某个问题
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参


// 获取用户信息
export function apiDelUser(uid:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/users/${uid}`,
		method: 'delete',
	})
}
