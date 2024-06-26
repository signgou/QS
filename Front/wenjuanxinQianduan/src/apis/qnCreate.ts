// 创建空白问卷
import httpRequest from '@/request/index'
import {HOST,PORT} from '@/config/APIconfig';
// 定义接口的传参
interface UserInfoParam {
	qnName:string
}

// 获取用户信息
export function apiQnCreate(param: UserInfoParam,idpath:string) {
    return httpRequest({
		url: `http://${HOST}:${PORT}/api/users/${idpath}/questionNaires`,
		method: 'post',
		data: param,
	})
}
