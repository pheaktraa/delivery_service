import { defineStore } from 'pinia'
import axios from 'axios'
import { update } from 'lodash-es'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    error: null,
    success: null,
    token: null,
    users: [],
    transporters: [],
  }),

  actions: {
    async login(data) {
      try {
        const res = await axios.post(`${API_URL}/auth/login`, data)
        this.user = res.data.user
        this.token = res.data.token
        console.log(res);
        
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

    async registerTransporter(firstname, lastname, email, password, license_plate, vehicle_type) {
      try {
        const res = await axios.post(
          `${API_URL}/transporter/registertransporter`,
          {
            firstname,
            lastname,
            email,
            password,
            license_plate,
            vehicle_type
          } 
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

    async gettransporterprofile(id) {
      try {
        const token = localStorage.getItem("transporter_token");
        const res = await axios.get(
          `${API_URL}/transporter/transporterprofile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return res.data.transporter || null;

      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch profile";
        this.error = message;
        return null;
      }
    },
    
    async getallusers() {
      try {
        const res = await axios.get(`${API_URL}/auth/getalluser`);
        this.users = res.data  
        return res.data  
      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch users";
        this.error = message;
        return [];
      }
    },

    async updateUserStatus(userId, status) {  // ✅ move it here
      try {
        const res = await axios.patch(`${API_URL}/auth/updatestatus/${userId}`, {
          status: status
        });
        this.success = res.data.message || "User status updated successfully";
        this.error = null;
        return { success: true, message: this.success };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to update user status";
        this.error = message;
        return { success: false, message };
      }
    },

    async updateUserProfile(userId, firstname, lastname, email) {  // ✅ move it here
      try {
        const res = await axios.patch(`${API_URL}/auth/updateprofile/${userId}`, {
          firstname,
          lastname,
          email
        });
        this.success = res.data.message || "User profile updated successfully";
        this.error = null;
        return { success: true, message: this.success };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to update user profile";
        this.error = message;
        return { success: false, message };
      }
    },

    async getalltransporters() {
      try {
        const res = await axios.get(`${API_URL}/transporter/getalltransporter`);
        this.transporters = res.data;
        return res.data;
      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch transporters";
        this.error = message;
        return [];
      }
    },

    async updateTransporterStatus(transporterId, status) {
      try {
        const res = await axios.patch(`${API_URL}/transporter/updatetransporterstatus/${transporterId}`, {
          status: status
        });
        this.success = res.data.message || "Transporter status updated successfully";
        this.error = null;
        return { success: true, message: this.success };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to update transporter status";
        this.error = message;
        return { success: false, message };
      }
    },

    async updateTransporterProfile(transporterId, firstname, lastname, email, license_plate, vehicle_type) {
      try {
        const res = await axios.patch(`${API_URL}/transporter/updatetransporterprofile/${transporterId}`, {
          firstname,
          lastname,
          email,
          license_plate,
          vehicle_type,
        });
        this.success = res.data.message || "Transporter profile updated successfully";
        this.error = null;
        return { success: true, message: this.success };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to update transporter profile";
        this.error = message;
        return { success: false, message };
      }
    },
  },
})
