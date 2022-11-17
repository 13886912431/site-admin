import axios from '@/utils/axios';

// 获取文章列表
export const getArticleList = params => axios.get('/api/article', { params });

// 获取文章详情
export const getArticleDetail = id => axios.get(`/api/article/${id}`);

// 添加文章
export const addArticle = data => axios.post('/api/article', data);

// 删除文章
export const deleteArticle = id => axios.delete(`/api/article/${id}`);

// 修改文章
export const updateArticle = data => axios.put(`/api/article/${data.id}`, data);

