import axios from '@/utils/axios';

// 上传
export const upload = data => axios.post('/api/resources/upload', data);