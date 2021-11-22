import axiosx from 'axios'

export const axios = axiosx.create({
  timeout: 5000
})

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
)

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
)