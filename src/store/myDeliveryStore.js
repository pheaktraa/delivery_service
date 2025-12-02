import { defineStore} from 'pinia';

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    deliveries: [
      {
        id: "D-1001",
        date: "2024-06-01",
        status: "Pending",
        items: [
          { name: "Bow", quantity: 2 },
        ],
        items_type: "weapons",
        total: 45.00,
        delivery_type: "standard",
        pickup_location: "Warehouse A",
        dropoff_location: "Customer Address 123",
        recipient_name: "John Doe",
        recipient_contact: "+1234567890",
        weight: "5",
        size: "S",
        payment_status: "Paid",
        image: "bow.png",
      },
      {
        id: "D-1002",
        date: "2024-05-28",
        status: "Delivered",
        items: [
          { name: "Diamond Sword", quantity: 3 },
        ],
        items_type: "weapons",
        total: 75.50,
        delivery_type: "express",
        pickup_location: "Warehouse A",
        dropoff_location: "Customer Address 123",
        recipient_name: "John Doe",
        recipient_contact: "+1234567890",
        weight: "5",
        size: "M",
        payment_status: "Unpaid",
        image: "diamondSword.png",
      },
      {
        id: "D-1003",
        date: "2024-06-03",
        status: "Pending",
        items: [
          { name: "Jacket", quantity: 1 },
        ],
        items_type: "clothing",
        total: 60.00,
        delivery_type: "standard",
        pickup_location: "Warehouse A",
        dropoff_location: "Customer Address 123",
        recipient_name: "John Doe",
        recipient_contact: "+1234567890",
        weight: "1",
        size: "L",
        payment_status: "Unpaid",
        image: "jacket.png",
      }
    ],
    selectedDelivery: null,
  }),

  actions: {
    getById(id) {
      return this.deliveries.find(d => d.id === id)
    }
  }
});