import axios from 'axios'

const BASE_URL = 'http://localhost:5005/persons'

const getAll = () => {
  return axios.get(BASE_URL).then(response => response.data)
}

const create = newObj => {
  return axios.post(BASE_URL, newObj).then(response => response.data)
}

const update = (id, newObj) => {
  return axios.put(`${BASE_URL}/${id}`, newObj).then(response => response.data)
}

const remove = id => {
  return axios.delete(`${BASE_URL}/${id}`).then(response => response.data)
}

export default { getAll, create, update, remove }
