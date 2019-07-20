import axios from "axios";
import { toastme } from "toastmejs";

const API_ROOT = "https://jsonplaceholder.typicode.com";

const $http = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_API_ROOT
      : API_ROOT,
  timeout: 5000
});

export default {
  async getAll() {
    try {
      const response = await $http.get("/users");
      const data = await response.data;

      return data;
    } catch (error) {
      console.log("Error fetching users", error);
      toastme.error(error.message);
      return error;
    }
  },
  async getOne(identifier) {
    try {
      const response = await $http.get(`/users/${identifier}`);
      const data = await response.data;

      return data;
    } catch (error) {
      console.log("Error fetching user", error);
      toastme.error(error.message);
      return error;
    }
  },

  async addUser(payload) {
    try {
      const response = await $http.post(`/users`, payload);
      const data = await response.data;
      toastme.success("User added");
      return data;
    } catch (error) {
      console.log("Error updating user", error);
      toastme.error(error.message);
      return error;
    }
  },

  async updateUser(identifier, payload) {
    try {
      const response = await $http.patch(`/users/${identifier}`, payload);
      const data = await response.data;
      toastme.success("User updated");
      return data;
    } catch (error) {
      console.log("Error updating user", error);
      toastme.error(error.message);
      return error;
    }
  },

  async delete(identifier) {
    try {
      const response = await $http.delete(`/users/${identifier}`);
      toastme.success("User deleted");
      return response;
    } catch (error) {
      console.log("Error deleting user", error);
      toastme.error(error.message);
      return error;
    }
  }
};
