import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (params, token) => {
  console.log('create blog', params, token)
  const config = {
    headers: { Authorization: `bearer ${token}` }
  }
  try {
    const response = await axios.post(baseUrl, params, config)
    return response.data
  } catch (exception) {
    console.log('exception', exception)
    return exception
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }