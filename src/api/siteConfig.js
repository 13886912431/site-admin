import axios from '@/utils/axios';

// 获取站点配置
export const getSiteConfig = () => axios.get('/api/config');

// 更新站点配置
export const updateSiteConfig = data => axios.put('/api/config', data);