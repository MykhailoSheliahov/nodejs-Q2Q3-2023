const axios = require('axios');

const API_URL = 'http://localhost:3000';

export const userService = {
  //1
  async createUser(params: {
    name: string,
    email: string,
    hobbies: string[],
  }) {
    const { data } = await axios.post(`${API_URL}/user/create`, params);
    return data;
  },

  async deleteUser(id: number) {
    const { data } = await axios.delete(`${API_URL}/user/${id}/delete`);
    return data;
  },

  //2
  async updateUser({ id, ...params }: {
    id: number,
    name?: string,
    email?: string,
    hobbies?: string[]
  }) {
    const data = await axios.put(`${API_URL}/user/${id}/update`, params);
    return data.data;
  },

  //3
  async getUserById(id: number) {
    const { data } = await axios.get(`${API_URL}/user/${id}`);
    return data;
  },
  async getUsers() {
    const { data } = await axios.get(`${API_URL}/users`);
    return data;
  },

  //4
  async addUserHobby({
    id,
    hobby
  }: {
    id: number,
    hobby: string
  }) {
    const { data } = await axios.put(`${API_URL}/user/${id}/hobbies/add`, { hobby });
    return data;
  },
  async deleteUserHobby({
    id,
    hobby
  }: {
    id: number,
    hobby: string
  }) {
    const { data } = await axios.put(`${API_URL}/user/${id}/hobbies/delete`, {hobby});
    return data;
  },

  //5
  async getUserHobbies(id: number) {
    const { data } = await axios.get(`${API_URL}/user/${id}/hobbies`);
    return data;
  },
}
