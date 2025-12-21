import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function normalizeProfile(d, fallbackId) {
    return {
        id: d?.id ?? d?._id ?? fallbackId,
        firstname: d?.firstname ?? d?.firstName ?? d?.first_name ?? '',
        lastname: d?.lastname ?? d?.lastName ?? d?.last_name ?? '',
        email: d?.email ?? '',
        phoneNumber: d?.phoneNumber ?? d?.phone_number ?? d?.phone ?? '',
        role: d?.role ?? '',
        vehicletype: d?.vehicletype ?? d?.vehicle_type ?? d?.vehicleType ?? '',
        plate_number: d?.plate_number ?? d?.plateNumber ?? ''
    }
}

export const useProfileStore = defineStore('profile', {
    state: () => ({
        data: null, // This holds the Full Name, Phone, Vehicle, etc.
        loading: false,
        error: null
    }),

    actions: {
        async fetchProfile(userId) {
            this.loading = true
            this.error = null

            try {
                // 1. REAL FETCH (When Backend is ready)
                
                const token = localStorage.getItem('token')
                const res = await axios.get(`${API_URL}/users/${userId}`, {
                   headers: { Authorization: `Bearer ${token}` }
                })
                this.data =  normalizeProfile(res.data, userId)
                
            } catch (err) {
                console.error("Profile Error:", err)

                if (import.meta.env.DEV) {
                    // simple mock fallback only in dev / on error
                    this.data = {
                        id: userId || 'mock-id',
                        firstname: 'Vibol',
                        lastname: 'Sok',
                        email: 'vibol@driver.com',
                        phoneNumber: '012 999 888',
                        role: 'transporter',
                        vehicletype: 'Motorbike',
                        plate_number: '1A-9999'
                    }
                } else {
                    this.error = 'Failed to load profile'
                }
            } finally {
                this.loading = false
            }
        },

        // You can also add updateProfile() here later!
    }
})