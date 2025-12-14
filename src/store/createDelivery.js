import { defineStore } from 'pinia';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const useCreateDeliveryStore = defineStore('createDelivery', {
  state: () => ({
    deliveryInfo: null,
    error: null,
    success: null,
  }),
  actions: {
    async createDelivery(data) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${API_URL}/createdelivery`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.success = res.data.message || "Delivery created successfully";
        this.error = null;
        this.deliveryInfo = res.data.delivery || null;
        return {
          success: true,
          message: this.success,
          delivery: this.deliveryInfo
        };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to create delivery";
        this.error = message;
        return {
          success: false,
          message
        };
      }
    },

    async getdeliverybyuser() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/mydeliveries`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // res.data.deliveries is the array from backend
        return res.data.deliveries || [];

      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch deliveries";
        this.error = message;
        return [];
      }
    },
    async getalldelivery() {
      try {
        const res = await axios.get(`${API_URL}/getalldelivery`)
        return res.data
      } catch (err) {
        const message = err.response?.data?.message;
        this.error = message;
        return [];
      }
    }

  }
});

export default useCreateDeliveryStore;