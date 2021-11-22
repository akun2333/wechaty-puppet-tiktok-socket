import axios from "axios"

export const client_key = 'awl0w3m654ji8l9a'
export const client_secret = '9bf4e898d54cc9e8a8c37ab400964b42'

export const request = async ({
  method,
  type = 'form',
  ...params
}) => {
  const { data: { data } } = await axios.request({
    baseURL: 'https://open.douyin.com',
    url: method,
    method: 'POST',
    headers: {
      'Content-Type': type == 'form' ? 'multipart/form-data' : ''
    },
    params
  })
  return data
}