<template>
  <div class="max-w-[80rem] h-full m-auto page">
    <div class="p-[2rem] bg-(--gray-100) mt-[2rem] rounded-lg sd">
      <div class="flex justify-between">
        <p class="text-[length:var(--text-title)] font-extrabold">Order Management Details</p>
        <button @click="router.back()" 
          class="text-xl text-white bg-(--gray-800) px-4 py-2 rounded-xl hover:bg-red-500">
          Back
        </button>
      </div>

      <!-- Items Details -->
      <div class="w-full h-full overflow-x-auto mt-[2rem] mb-[1rem]">
        <div v-if="item" class="w-full h-full grid grid-cols-2 gap-[2rem] p-[2rem] border-0 border-(--gray-300) rounded-lg bg-white">      
         <!-- Replace your current image container with this -->
          <div class="border border-(--gray-300) rounded-lg overflow-hidden bg-gray-50 h-[450px] relative">
            <!-- The actual Map -->
            <div ref="mapDiv" class="w-full h-full"></div>
            
            <!-- Overlay for when there is no data -->
            <div v-if="!item" class="absolute inset-0 flex items-center justify-center text-gray-400">
              No delivery data found.
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <!-- Section 1 -->
            <div class="flex flex-row justify-between border-b-[2px] border-(--gray-300) pb-2">
              <!-- Left side -->
              <div class="flex flex-col gap-2">
                <p 
                  v-for="item in item.items" :key="item.name"
                  class="text-[length:var(--text-title)] font-bold">
                  {{ item.name }} (x{{ item.quantity }})
                </p>
                <p><strong>ID:</strong> {{ item.id }}</p>
                <p><strong>Date:</strong> {{ item.date.split('T')[0] }}</p>
                <p>
                  <strong>Status: </strong>
                  <span :class="[
                    'px-2 py-1 rounded-full text-sm font-bold border',
                    item.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                    item.status === 'in_transit' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    item.status === 'accepted' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-(--gray-100) text-(--gray-600)'
                  ]">
                  {{ item.status || 'waiting for acceptance' }}
                  </span>
                </p>
              </div>

              <!-- Right side -->
              <!-- <div class="flex flex-col gap-2 items-end">
                <button 
                  class="text-(--gray-100) border border-(--red-900) rounded-lg p-[.5rem] bg-(--red-800) hover:bg-(--red-700) transition duration-300 hover:cursor-pointer">
                  Delete
                </button>
              </div> -->
            </div>

            <!-- Section 2 -->
            <div class="flex flex-col gap-2 border-b-[2px] border-(--gray-300) pb-2">
              <p><strong>Size:</strong> {{ item.itemsize }}</p>
              <p><strong>Weight:</strong> {{ item.weight }}Kg</p>
              <p><strong>Item type:</strong> {{ item.type_of_items }}</p>
            </div>

            <!-- Section 3 -->
            <div class="flex flex-col gap-2 border-b-[2px] border-(--gray-300) pb-2">
              <p><strong>Price:</strong> ${{ item.total_amount }}</p>
              <p><strong>Pickup Address:</strong> {{ item.pick_up_address }}</p>
              <p><strong>Destination Address:</strong> {{ item.destination_address }}</p>
            </div>

            <!-- Section 4 -->
            <div class="flex flex-col gap-2">
              <p><strong>Delivery Type:</strong> {{ item.type_of_delivery }}</p>
              <p><strong>Recipient:</strong> {{ item.receiver_name }}</p>
              <p><strong>Recipient Contact:</strong> {{ item.receiver_contact }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { useDeliveryStore } from '../../../store/myDeliveryStore';
import { importLibrary } from "../../../utils/googleMaps"; // Import your utility

const store = useDeliveryStore();
const item = store.selectedDelivery;

const router = useRouter();

// --- GOOGLE MAPS SETUP ---
const mapDiv = ref(null);
let map = null;
let directionsService = null;
let directionsRenderer = null;

onMounted(async () => {
  if (item) {
    await initMap();
  }
});

const initMap = async () => {
  const { Map } = await importLibrary("maps");
  const { DirectionsService, DirectionsRenderer } = await importLibrary("routes");

  // 1. Initialize the map
  map = new Map(mapDiv.value, {
    center: { lat: 11.5564, lng: 104.9282 }, // Phnom Penh
    zoom: 13,
    disableDefaultUI: true,
    mapId: "USER_TRACKING_MAP", // Optional: for advanced styling
  });

  // 2. Setup Directions
  directionsService = new DirectionsService();
  directionsRenderer = new DirectionsRenderer({
    map: map,
    polylineOptions: {
      strokeColor: "#1D4ED8", // Blue color for user route
      strokeWeight: 6
    }
  });

  calculateRoute();
};

const calculateRoute = () => {
  // Use coordinates if available, otherwise fallback to text
  // 1. Ensure we have both coordinates and convert them to Numbers just in case
  const origin = (item.pickup_lat && item.pickup_lng) 
    ? { lat: Number(item.pickup_lat), lng: Number(item.pickup_lng) } 
    : item.pick_up_address;

  const destination = (item.destination_lat && item.destination_lng) 
    ? { lat: Number(item.destination_lat), lng: Number(item.destination_lng) } 
    : item.destination_address;

  // 2. Stop if data is totally missing
  if (!origin || !destination) return;

  // 3. Request the route
  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: "DRIVING",
  }, (response, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(response);
    } else {
      console.error("Google Maps failed to find a route. Check addresses!");
    }
  });
};

const getImage = (name) => {
  return new URL(`../../assets/img/${name}`, import.meta.url).href;
}
</script>