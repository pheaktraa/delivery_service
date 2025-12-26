
<template>
  <!-- main container -->
  <div class="max-w-[80rem] h-full m-auto page relative">
    
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-[2rem]">
      <div>
        <h1 class="text-3xl font-bold text-(---gray-800)">Order Detail</h1>
        <p class="text-(--gray-500)">Order ID: #{{ order.delivery_id  }}</p>
      </div>
      
      <!-- Back Button -->
      <button @click="router.back()" 
        class="text-xl text-white bg-(--gray-800) px-4 py-2 rounded-xl hover:bg-(--gray-600) transition-all duration-300">
        Back
      </button>
    </div>

    <!-- MAIN CARD -->
    <div class="bg-white rounded-2xl sd overflow-hidden border border-(--gray-500)">
      
      <div class="grid grid-cols-1 lg:grid-cols-2">
        
        <!-- LEFT COLUMN: MAP -->
        <div class="h-[400px] lg:h-full lg:min-h-[600px] relative bg-gray-100">
          <!-- Actual Map Container -->
          <div ref="mapDiv" class="w-full h-full"></div>

          <!-- FLOATING DISTANCE BADGE -->
           <!-- CHANGED 'item' use in user to 'order' driver -->
          <div v-if="order && order.distance" class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-md border border-gray-200 z-10">
            <p class="text-xs font-bold text-gray-500 uppercase">Total Distance</p>
            <p class="text-lg font-bold text-(--red-800)">{{ Number(order.distance).toFixed(2) }} km</p>
          </div>

          <!-- Overlay for when there is no data -->
           <!-- CHANGED '!item' to '!order.delivery_id' -->
          <div v-if="!order.delivery_id" class="absolute inset-0 flex items-center justify-center text-gray-400">
            No delivery data found.
          </div>

        </div>

        <!-- RIGHT COLUMN: DETAILS -->
        <div class="p-8 flex flex-col justify-between">
          
          <div class="space-y-6">
            <!-- Status Badge -->
            <div>
              <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase', 
                currentStep === 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700']">
                {{ currentStep === 0 ? 'Waiting for Driver' :currentStep === 1 ? 'Accepted' : (currentStep === 2 ? 'In Transit' : 'Delivered') }}
              </span>
            </div>

            <!-- 1. FROM -->
            <div :class="['p-4 rounded-xl border transition', currentStep <= 1 ? 'border-red-500 bg-red-50' : 'border-gray-100']">
              <p class="text-xs font-bold text-(--gray-400) uppercase mb-1">From (Pickup)</p>
              <p class="text-xl font-bold text-(--gray-800)">{{ order.pick_up_address }}</p>
              <div class="mt-[1rem] flex gap-2">
                <button class="text-xs bg-white border px-3 py-1 rounded font-bold">📞 {{ order.pickupPhone }}</button>
              </div>
            </div>

            <!-- 2. TO -->
            <div :class="['p-4 rounded-xl border transition', currentStep === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-100']">
              <p class="text-xs font-bold text-(--gray-400) uppercase mb-1">To (Dropoff)</p>
              <p class="text-xl font-bold text-(--gray-800)">{{ order.destination_address }}</p>
              <div class="mt-[1rem] flex gap-2">
                <button class="text-xs bg-white border px-3 py-1 rounded font-bold">📞 {{ order.receiver_contact }}</button>
              </div>
            </div>

            <!-- 3. ITEM & PAYMENT -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Column Weight -->
              <div>
                <p class="text-xs font-bold text-(--gray-400) uppercase">Item Weight</p>
                <p class="font-bold text-(--gray-800)">{{ order.weight }} Kg</p>
              </div>
              <!-- Column Distance -->
              <div>
                <p class="text-xs font-bold text-(--gray-400) uppercase">Distance</p>
                <!-- We use Number().toFixed(1) to make it look clean (e.g. 8.3 km) -->
                <p class="font-bold text-(--gray-800)"> 
                  {{ order.distance ? Number(order.distance).toFixed(2) + ' km' : '...' }}
                </p>
              </div>
              <!-- Column Payment (total) -->
              <div>
                <p class="text-xs font-bold text-(--gray-400) uppercase">Payment</p>
                <p class="font-bold text-green-600">${{ order.total_amount  }}</p>
                <p class="font-bold text-(--gray-800)">{{ order.payment_type }}</p>
              </div>
              <!-- Column Payment (driver share) -->
              <div>
                <p class="text-xs font-bold text-(--gray-400) uppercase">Driver Payment</p>
                <p class="font-bold text-green-600">${{ driverEarning  }}</p>
                <p class="font-bold text-(--gray-800)">{{ order.payment_type }}</p>
              </div>
            </div>
          </div>

          <!-- BIG ACTION BUTTON -->
          <div class="mt-[2rem]">
            <button 
              @click="handleMainAction"
              :class="['w-full py-4 text-white font-bold text-lg rounded-xl', 
                currentStep === 3 ? 'bg-(--gray-800)' : 'bg-red-600 hover:bg-red-700']"
            >
              {{ buttonText }}
            </button>
          </div>

        </div>

      </div>
    </div>
    <transition name="fade">
      <div
         v-if="showMessage"
        class="absolute top-25 left-9/12 -translate-x-1/2 w-[16rem] py-3 px-4 text-center rounded-lg z-2"
        :class="
          deliveryStore.error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        "
      >
        <p v-if="deliveryStore.error">{{ deliveryStore.error }}</p>
        <p v-else>{{ deliveryStore.success }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useCreateDeliveryStore from '../../store/createDelivery'
// import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { importLibrary, animateMarkerAlongPath, stopMarkerAnimation } from "../../utils/googleMaps"

const route = useRoute()
const router = useRouter()
const deliveryStore = useCreateDeliveryStore()
const order = ref({})
const showMessage = ref(false)

// --- STATE FOR ANIMATION ---
const mapDiv = ref(null) 
let map = null
let directionsService = null
let directionsRenderer = null
let movingMarker = null // The Car icon
let roadPath = []       // The list of dots from Google

// NEW EARNING LOGIC GOES HERE
const driverEarning = computed(() => {
  if (!order.value.total_amount) return "0.00";
  
  // Calculate 80% for the driver
  const earning = Number(order.value.total_amount) * 0.8;
  return earning.toFixed(2);
});

// Calculate the Company Fee (20%) just in case you want to show it
// const companyFee = computed(() => {
//   if (!order.value.total_amount) return "0.00";
//   const fee = Number(order.value.total_amount) * 0.2;
//   return fee.toFixed(2);
// });

// // 1. Define the key from your .env file
// const myApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// // 2. Set Options (Using the variable we just defined)
// setOptions({
//   apiKey: myApiKey, 
//   version: "weekly",
// });

// // 3. Google Maps Setup
// const mapDiv = ref(null) // Ref for the HTML element
// let map = null
// let directionsService = null
// let directionsRenderer = null

const orderId = Number(route.params.id);
console.log("delivered_id", orderId);

const currentStep = ref(0)

onMounted(async () => {
  // DEBUGGING: This will tell us if Vite can see your file
  // console.log("CHECK 1: Env Object:", import.meta.env)
  // console.log("CHECK 2: API Key value:", myApiKey)

  // if (!myApiKey) {
  //   console.error("CRITICAL ERROR: API Key is missing! Check your .env file name and content.")
  //   return
  // }

  try {
    const data = await deliveryStore.getDeliveryById(orderId)
    order.value = data.delivery

    // Sync currentStep with database status if needed
    if(order.value.status === 'accepted') currentStep.value = 1
    if(order.value.status === 'in_transit') currentStep.value = 2
    if(order.value.status === 'delivered') currentStep.value = 3

    initMap()
  } catch (err) {
    console.error('Failed to load delivery', err)
  }
})

const initMap = async () => {
  const { Map } = await importLibrary("maps");
  const { Marker } = await importLibrary("marker");
  const { DirectionsService, DirectionsRenderer } = await importLibrary("routes")

  map = new Map(mapDiv.value, {
    center: { lat: 11.5564, lng: 104.9282 }, 
    zoom: 13,
    disableDefaultUI: true,
  })

  directionsService = new DirectionsService()
  directionsRenderer = new DirectionsRenderer({
    map: map,
    polylineOptions: { strokeColor: "#EF4444", strokeWeight: 5 }
  })

  // Create the Moving Car Marker (Invisible at first)
  movingMarker = new Marker({
    map: map,
    visible: false, 
    icon: {
      url: "https://maps.google.com/mapfiles/kml/pal2/icon47.png", 
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    }
  });

  calculateAndDisplayRoute()
}

// ROUTE CALCULATION LOGIC
const calculateAndDisplayRoute = () => {
  // 1. Ensure we have both coordinates and convert them to Numbers just in case
  const origin = (order.value.pickup_lat && order.value.pickup_lng) 
    ? { lat: Number(order.value.pickup_lat), lng: Number(order.value.pickup_lng) } 
    : order.value.pick_up_address;

  const destination = (order.value.destination_lat && order.value.destination_lng) 
    ? { lat: Number(order.value.destination_lat), lng: Number(order.value.destination_lng) } 
    : order.value.destination_address;

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

      // CAPTURE THE ROAD PATH (The dots)
      roadPath = response.routes[0].overview_path;
      console.log("Road path captured. Ready for animation!");

    } else {
      console.error("Google Maps failed to find a route. Check addresses!");
    }
  });
};

// Watch for address changes (optional but good practice)
watch(() => order.value, () => {
  if (map) calculateAndDisplayRoute()
}, { deep: true })

// const currentStep = ref(0) 

// 4. ACTION HANDLER
const handleMainAction = async () => {
  try {
    if (currentStep.value === 0) {
      // Logic: Accept -> Status 1
      const result = await deliveryStore.acceptDelivery(orderId)
      if (result.success) {
        order.value = result.delivery
        currentStep.value = 1
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 2600);
      } else {
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 2600);
      }
    } else if (currentStep.value === 1) {
      // Logic: Confirm Pickup -> Status 2 (START ANIMATION)
      const result = await deliveryStore.updateDeliveryStatus(orderId, 2)
      if (result.success) {
        order.value = result.delivery
        currentStep.value = 2
        
        // START THE "DUMMY" TRIP (15 seconds long)
        movingMarker.setVisible(true);
        // Change 20 to 30 for a slow, 30-second trip
        // Change 20 to 5 for a very fast, 5-second trip
        animateMarkerAlongPath(movingMarker, roadPath, 30);
      }
    } else if (currentStep.value === 2) {
      // Logic: Confirm Delivery -> Status 3 (STOP & SKIP)
      const result = await deliveryStore.updateDeliveryStatus(orderId, 3)
      if (result.success) {
        order.value = result.delivery
        currentStep.value = 3
        
        // FORCE CAR TO DESTINATION AND STOP
        const dest = { lat: Number(order.value.destination_lat), lng: Number(order.value.destination_lng) };
        stopMarkerAnimation(movingMarker, dest);
        
        // TIMER
        // 5000 means the car stays for 5 seconds before disappearing
        setTimeout(() => movingMarker.setVisible(false), 5000);
      }
    } else if (currentStep.value === 3) {
      router.push('/driver/accDelivery')
    }
  } catch (err) {
    console.error(err)
    alert('Something went wrong.')
  }
}

// BUTTON TEXT LOGIC
const buttonText = computed(() => {
  switch(currentStep.value) {
    case 0: return 'Accept Job'
    case 1: return '📦 Confirm Pickup'
    case 2: return '✅ Confirm Delivery'
    default: return 'Back to List'
  }
})

// Cleanup animation if user leaves the page
// onMounted(() => {
//   return () => stopMarkerAnimation();
// })
onUnmounted(() => {
  stopMarkerAnimation();
})

</script>