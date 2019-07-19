import axios from 'axios'

const $http = axios.create({
    baseURL: "http://localhost:5100",
    timeout: 5000
});

export default {
    async getAll() {
        try {
            const response = await $http.get("/users");
            const data = await response.data

            return data
        } catch (error) {
            console.log('Error fetching users', error)
            return error
        }
    },
    async getOne(identifier) {
        try {
            const response = await $http.get(`/users/${identifier}`);
            const data = await response.data

            return data
        } catch (error) {
            console.log('Error fetching user', error)
            return error
        }
    },

    async updateUser(identifier, payload) {
        try {
            const response = await $http.patch(`/users/${identifier}`, payload);
            const data = await response.data

            return data
        } catch (error) {
            console.log('Error fetching user', error)
            return error
        }
    },

    async delete(identifier) {
        try {
            const response = await $http.delete(`/users/${identifier}`);

            return response
        } catch (error) {
            console.log('Error deleting user', error)
            return error
        }
    }
}