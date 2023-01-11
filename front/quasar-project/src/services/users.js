import { api } from 'boot/axios'

export const register = (params) => api.post('/users/register', params)
export const login = (params) => api.post('/users/login', params)
export const logout = () => api.post('/users/logout')
export const getActiveUser = () => {
    return api.get('/users/me')
  }