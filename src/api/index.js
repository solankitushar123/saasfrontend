import api from './axios'

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getOne: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
}

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getOne: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
}

export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getOne: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
}

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  updateStatus: (id, status) => api.put(`/contact/${id}/status`, { status }),
}

export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
}

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
}
