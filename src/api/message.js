import axios from '@/utils/axios';

// 获取留言
export const getMessage = params => axios.get('/api/message', { params });

// 删除留言
export const deleteMessage = id => axios.delete(`/api/message/${id}`);