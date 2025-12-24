
<template>
  <!-- main container -->
  <div class="max-w-[80rem] h-full m-auto page">
    
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-[2rem]">
      <div>
        <h1 class="text-3xl font-bold text-(---gray-800)">Order Detail</h1>
        <p class="text-(--gray-500)">Order ID: #{{ order.delivery_id  }}</p>
      </div>
      
      <!-- Back Button -->
      <button @click="router.back()" 
        class="text-xl text-white bg-(--gray-800) px-4 py-2 rounded-xl hover:bg-red-500">
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
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-bold text-(--gray-400) uppercase">Item Type</p>
                <p class="font-bold text-(--gray-800)">{{ order.itemType }} ({{ order.weight }})</p>
              </div>
              <div>
                <p class="text-xs font-bold text-(--gray-400) uppercase">Payment</p>
                <p class="font-bold text-green-600">${{ order.total_amount  }}</p>
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

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useCreateDeliveryStore from '../../store/createDelivery'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

const route = useRoute()
const router = useRouter()
const deliveryStore = useCreateDeliveryStore()
const order = ref({})

// 1. Define the key from your .env file
const myApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// 2. Set Options (Using the variable we just defined)
setOptions({
  apiKey: myApiKey, 
  version: "weekly",
});

// 3. Google Maps Setup
const mapDiv = ref(null) // Ref for the HTML element
let map = null
let directionsService = null
let directionsRenderer = null

const orderId = Number(route.params.id);
console.log("delivered_id", orderId);

onMounted(async () => {
  // DEBUGGING: This will tell us if Vite can see your file
  console.log("CHECK 1: Env Object:", import.meta.env)
  console.log("CHECK 2: API Key value:", myApiKey)

  if (!myApiKey) {
    console.error("CRITICAL ERROR: API Key is missing! Check your .env file name and content.")
    return
  }

  try {
    const data = await deliveryStore.getDeliveryById(orderId)
    order.value = data.delivery
    initMap()
  } catch (err) {
    console.error('Failed to load delivery', err)
  }
})

const initMap = async () => {
  const { Map } = await importLibrary("maps")
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

  calculateAndDisplayRoute()
}

// ROUTE CALCULATION LOGIC
const calculateAndDisplayRoute = () => {
  // Use coordinates instead of text addresses
  if (!order.value.pickup_lat || !order.value.destination_lat) {
    console.warn("Using text address as fallback...");
    // fallback to text if coordinates are missing
    var origin = order.value.pick_up_address;
    var destination = order.value.destination_address;
  } else {
    // Use the precise coordinates!
    var origin = { lat: order.value.pickup_lat, lng: order.value.pickup_lng };
    var destination = { lat: order.value.destination_lat, lng: order.value.destination_lng };
  }

  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: "DRIVING",
  }, (response, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(response);
    }
  });
};

// Watch for address changes (optional but good practice)
watch(() => order.value, () => {
  if (map) calculateAndDisplayRoute()
}, { deep: true })

const currentStep = ref(0) 

const mapUrl = computed(() => {
  if (!order.value) return "";

  const address =
    currentStep.value <= 1
      ? order.value.pick_up_address
      : order.value.destination_address;

  if (!address) return "";

  return `https://www.google.com/maps/embed/v1/place?key=${
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  }&q=${encodeURIComponent(address)}`;
});



// 4. ACTION HANDLER
const handleMainAction = async () => {
  try {
    if (currentStep.value === 0) {
      // Accept delivery
      const result = await deliveryStore.acceptDelivery(orderId)
      if (result.success) {
        order.value = result.delivery
        currentStep.value = 1
      } else {
        alert(result.message)
      }
    } else if (currentStep.value === 1 || currentStep.value === 2) {
      // Update delivery status
      const result = await deliveryStore.updateDeliveryStatus(orderId, currentStep.value + 1)
      if (result.success) {
        order.value = result.delivery
        currentStep.value += 1
      } else {
        alert(result.message)
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
</script>