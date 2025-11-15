import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        error: null
    }),
    actions: {
        async login(email, password) {
            try {
                const res = await axios.post(`${API_URL}/login`, { email, password })
                this.user = res.data.user
                this.error = null
            } catch (err) {
                this.error = err.response?.data?.message || 'Login failed'
            }
        },
        async register(firstname, lastname, email, password) {
            try {
                const res = await axios.post(`${API_URL}/register`, { firstname, lastname, email, password })
                this.user = res.data
                this.error = null
            } catch (err) {
                this.error = err.response?.data?.message || 'Registration failed'
            }
        }
    }
})
