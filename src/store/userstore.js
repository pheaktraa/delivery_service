import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    error: null,
    success: null,
    token: null
  }),

  actions: {
    async login(data) {
      try {
        const res = await axios.post(`${API_URL}/auth/login`, data)
        this.user = res.data.user
        this.token = res.data.token
        localStorage.setItem("token", res.data.token)
        this.error = null
        this.success = res.data.message || "Login successful"
        return { success: true, message: res.data.message }
      } catch (err) {
        const message = err.response?.data?.message || "Login failed"
        this.error = message
        return { success: false, message }
      }
    },

    async register(data) {
      try {
        const res = await axios.post(`${API_URL}/auth/register`, data);

        // Optional: store user & token if backend sends them back
        this.user = res.data.user || null;
        this.token = res.data.token || null;

        this.error = null;
        this.success = res.data.message || "Register success";

        return {
          success: true,
          message: this.success,
          user: this.user,
          token: this.token,
        };

      } catch (err) {
        const message = err?.response?.data?.message || "Registration failed";

        this.error = message;

        return {
          success: false,
          message,
        };
      }
    },

    async loginTransporter(data) {
      try {
        const res = await axios.post(`${API_URL}/transporter/logintransporter`, data);

        this.user = res.data.transporter;
        this.token = res.data.token;
        localStorage.setItem("transporter_token", res.data.token);

        this.error = null;
        this.success = res.data.message || "Transporter login successful";

        return { success: true, message: this.success };
      } catch (err) {
        const message =
          err.response?.data?.message || "Transporter login failed";
        this.error = message;
        return { success: false, message };
      }
    },

    async registerTransporter(data) {
      try {
        const res = await axios.post(
          `${API_URL}/transporter/registertransporter`,
          data
        );

        this.success = res.data.message || "Transporter registered";
        this.error = null;

        return { success: true, message: this.success };
      } catch (err) {
        const message =
          err.response?.data?.message || "Transporter register failed";
        this.error = message;
        return { success: false, message };
      }
    },

    async saveProfileEdits(data) {
      try {
        const res = await axios.put(`${API_URL}/auth/profile`, data, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        this.user = res.data.user;
        this.error = null;

        this.success = res.data.message || "Profile updated successfully";
        return { success: true, message: this.success };

      } catch (err) {
        const message = err.response?.data?.message || "Profile update failed";
        this.error = message;
        return { success: false, message };
      }
    },
  }
})
