import axios from '@/utils/axios';

// 获取分类
export const getClassify = params => axios.get('/api/classify', { params });
