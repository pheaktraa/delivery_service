import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const useUserRatingStore = defineStore('userRating', {
  state: () => ({
    ratings: [],
    error: null,
    success: null,
  }),

  actions: {
    async fetchRatings() {
      try {
        const res = await axios.get(`${API_URL}/rating`);
        this.ratings = res.data.ratings;
        this.error = null;
        return this.ratings;
      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch ratings";
        this.error = message;
        return [];
      }
    },

    async submitRating(data) {
      try {
        const token = localStorage.getItem("token");
        // Send token in axios header because backend requires it
        const res = await axios.post(
          `${API_URL}/rating`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        this.success = res.data.message || "Rating submitted successfully";
        this.error = null;

        return {
          success: true,
          message: this.success,
          rating: res.data.rating || null
        };

      } catch (err) {
        const message = err.response?.data?.message || "Failed to submit rating";
        this.error = message;

        return {
          success: false,
          message
        };
      }
    }

  }
});

export default useUserRatingStore;
