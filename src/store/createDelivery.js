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
    },
    async getDeliveryById(deliveryId) {
      if (!deliveryId) {
        throw new Error("Delivery ID is missing");
      }

      const res = await axios.get(
        `${API_URL}/getdeliverybyid/${deliveryId}`
      );

      return res.data;
    },
    async acceptDelivery(deliveryId) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${API_URL}/transporter/accept`,
          { delivery_id: deliveryId },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        this.success = res.data.message || "Delivery accepted successfully";
        this.error = null;

        return {
          success: true,
          message: this.success,
          delivery: res.data.delivery // 
        };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to accept delivery";
        this.error = message;
        return { success: false, message };
      }
    },
    async updateDeliveryStatus(deliveryId, status) {
      try {
        const token = localStorage.getItem("token");

        // Make sure the payload matches backend expectations
        const statusMap = {
          1: "accepted",
          2: "in_transit",
          3: "delivered"
        };
        const payload = { delivery_id: deliveryId, status: statusMap[status] };

        console.log("Updating delivery status with payload:", payload);

        const res = await axios.patch(
          `${API_URL}/transporter/status`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.success = res.data.message || "Delivery status updated successfully";
        this.error = null;

        return {
          success: true,
          message: this.success,
          delivery: res.data.delivery
        };
      } catch (err) {
        const message = err.response?.data?.message || "Failed to update delivery status";
        console.error("UpdateDeliveryStatus Error:", err.response?.data || err);
        this.error = message;
        return { success: false, message };
      }
    },
    async getTransporterDeliveries() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/getdeliveriesbytransporter`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return res.data.deliveries || [];

      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch transporter deliveries";
        this.error = message;
        return [];
      }   
    },

    async getDriverStats() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/transporter/stats`, // Matches the route we created
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // This returns { success, total_delivered, total_earnings, company_commission }
        return res.data;

      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch driver stats";
        this.error = message;
        console.error("Store getDriverStats Error:", message);
        return { 
          success: false, 
          total_delivered: 0, 
          total_earnings: "0.00" 
        };
      }
    },

  }
});

export default useCreateDeliveryStore;