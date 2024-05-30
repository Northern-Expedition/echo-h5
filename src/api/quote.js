/**
 * 推广中心api
 */

import { post } from '@/utils/request'
//推广中心统计数据
export const switchTypeApi = (type) => post('/api/user/switch?type=' + type)
