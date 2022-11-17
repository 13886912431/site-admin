import axios from '@/utils/axios';

// 获取图片
export const getImage = () => axios.get('/api/image');

// 删除图片
export const deleteImage = data => axios.delete('/api/image', { data });

// 添加图片
export const addImage = data => axios.post('/api/image', data);