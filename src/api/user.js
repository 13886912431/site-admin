import axios from '@/utils/axios';

// 登录
export const login = data => axios.post('/api/user/login', data);

// 添加用户
export const addUser = data => axios.post('/api/user', data);

// 获取用户
export const getUser = () => axios.get('/api/user');

// 删除用户
export const deleteUser = id => axios.delete(`/api/user/${id}`);

// 修改用户信息
export const updateUser = data => axios.put(`/api/user/${data.id}`, data);

// 修改密码
export const updatePassword = data => axios.put('/api/user/password', data);

// 获取用户信息
export const getInfo = () => axios.get('/api/user/info');