import axios from '@/utils/axios';

// 获取评论
export const getComment = params => axios.get('/api/comment', { params });

// 删除评论
export const deleteComment = id => axios.delete(`/api/comment/${id}`);

// 获取回复
export const getReply = params => axios.get('/api/reply', { params });

// 删除回复
export const deleteReply = id => axios.delete(`/api/reply/${id}`);