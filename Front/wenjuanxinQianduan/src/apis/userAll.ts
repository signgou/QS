// 获取用户全部问卷（没有具体信息）
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参


// 获取用户信息
export function apiUserAll(uid:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/users/${uid}/questionNaires`,
		method: 'get',
		
	})
}
