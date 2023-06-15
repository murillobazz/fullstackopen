import axios from 'axios';
const baseUrl = 'https://backend-test-ici0.onrender.com/api/persons'; // Backend deployed on Render.

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
}

const erase = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const personService = {
  getAll,
  create,
  update,
  erase
};

export default personService;

