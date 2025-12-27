<template>
  <div class="max-w-[80rem] h-full m-auto page">
    <div class="mt-[2rem] bg-(--gray-100) p-[2rem] rounded-lg sd">
      <div class="border-b-[2px] border-(--gray-300) pt-[2rem] pb-[2rem] flex justify-between">
        <p class="text-(--red-800) text-[length:var(--text-title)] font-bold">
          My Deliveries Details
        </p>
        <button @click="router.back()" 
          class="text-xl text-white bg-(--red-800) px-4 py-2 rounded-xl hover:bg-(--red-600) transition-all duration-300">
          Back
        </button>
      </div>

      <!-- Items Details -->
      <div class="w-full h-full overflow-x-auto mt-[2rem] mb-[1rem]">
        <div
          v-if="item"
          class="w-full h-full grid md:grid-cols-1 lg:grid-cols-2 gap-[2rem] p-[2rem] border-0 border-(--gray-300) rounded-lg bg-white"
        >
          <!-- <div
            class="border border-(--gray-300) rounded-lg p-[1rem] flex items-center justify-center"
          >
            <img
              :src="getImage(item.image)"
              alt=""
              class="w-[20rem] h-[20rem] object-cover"
            />
          </div> -->
          <!-- Replace your current image container with this -->
          <div class="border border-(--gray-300) rounded-lg overflow-hidden bg-gray-50 h-[450px] lg:h-full lg:min-h-[550px] relative">
            <!-- The actual Map -->
            <div ref="mapDiv" class="w-full h-full"></div>

            <!-- FLOATING DISTANCE BADGE -->
            <div v-if="item.distance" class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-md border border-gray-200 z-10">
              <p class="text-xs font-bold text-gray-500 uppercase">Total Distance</p>
              <p class="text-lg font-bold text-(--red-800)">{{ Number(item.distance).toFixed(2) }} km</p>
            </div>
            
            <!-- Overlay for when there is no data -->
            <div v-if="!item" class="absolute inset-0 flex items-center justify-center text-gray-400">
              No delivery data found.
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <!-- Section 1 -->
            <div
              class="flex flex-row justify-between border-b-[2px] border-(--gray-300) pb-2"
            >
              <!-- Left side -->
              <div class="flex flex-col gap-2">
                <p
                  v-for="item in item.items"
                  :key="item.name"
                  class="text-[length:var(--text-title)] font-bold"
                >
                  {{ item.name }} (x{{ item.quantity }})
                </p>
                <p><strong>ID:</strong> {{ item.user_id }}</p>
                <p><strong>Date:</strong> {{ item.date.split("T")[0] }}</p>
                <p>
                  <strong>Status: </strong>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-sm font-bold border',
                      item.status === 'delivered'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : item.status === 'in_transit'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : item.status === 'accepted'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-(--gray-100) text-(--gray-600)',
                    ]"
                  >
                    {{ item.status || 'waiting for acceptance' }}
                  </span>
                </p>
              </div>

              <!-- Right side -->
              <!-- <div class="flex flex-col gap-2 items-end">
                <button
                  class="text-(--gray-100) border border-(--red-900) rounded-lg p-[.5rem] bg-(--red-700) hover:bg-(--red-800) hover:cursor-pointer"
                >
                  Delete
                </button>
              </div> -->
            </div>

            <!-- Section 2 -->
            <div
              class="flex flex-col gap-2 border-b-[2px] border-(--gray-300) pb-2"
            >
              <p><strong>Size:</strong> {{ item.itemsize }}</p>
              <p><strong>Weight:</strong> {{ item.weight }}Kg</p>
              <p><strong>Item type:</strong> {{ item.type_of_items }}</p>
            </div>

            <!-- Section 3 -->
            <div
              class="flex flex-col gap-2 border-b-[2px] border-(--gray-300) pb-2"
            >
              <p><strong>Price:</strong> ${{ item.total_amount }}</p>

              <p v-if="item.distance">
                <strong>Distance:</strong> {{ Number(item.distance).toFixed(2) }} km
              </p>

              <p><strong>Pickup Address:</strong> {{ item.pick_up_address }}</p>
              <p>
                <strong>Destination Address:</strong>
                {{ item.destination_address }}
              </p>
            </div>

            <!-- Section 4 -->
            <p><strong>Delivery Type:</strong> {{ item.type_of_delivery }}</p>
            <p><strong>Recipient:</strong> {{ item.receiver_name }}</p>
            <p>
              <strong>Recipient Contact:</strong> {{ item.receiver_contact }}
            </p>
            <p><strong>delivery_id:</strong> {{ item.delivery_id }}</p>
            <router-link> </router-link>
            <div class="flex justify-between">
              <p>
                <strong>Transporter :</strong>
                <span v-if="item.transporter_name">{{
                  item.transporter_name
                }}</span>
                <span v-else>N/A</span>
              </p>
              <button>
                <div
                  class="p-1 bg-(--red-800) w-[3rem] flex items-center justify-center h-[3rem] rounded-full relative"
                  @click="openChat"
                >
                  <img
                    src="../../assets/icon/chaticon.svg"
                    alt=""
                    class="w-[1.5rem] z-1 hover:cursor-pointer"
                  />
                  <div
                    class="w-[2rem] h-[2rem] bg-(--red-800) rounded-full absolute z-2 flex items-center justify-center left-[2rem] top-[-1rem]"
                    v-if="show > 1"
                  >
                    <p class="text-white">1</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useDeliveryStore } from "../../store/myDeliveryStore";
import useChatStore from "../../store/chatStore";
import { useRouter } from "vue-router";
import { importLibrary, animateMarkerAlongPath, stopMarkerAnimation } from "../../utils/googleMaps";
import { supabase } from "../../utils/supabase";

// ROUTER & STORE SETUP
const router = useRouter();
const chatStore = useChatStore();
const store = useDeliveryStore();
const item = store.selectedDelivery;


// REACTIVE STATE (Refs)
const mapDiv = ref(null);
const show = 0; // placeholder, update if needed

// NON-REACTIVE STATE (Map objects and Subscriptions)
let map = null;
let directionsService = null;
let directionsRenderer = null;
let statusSubscription = null; // To hold the Realtime listener
// STATE FOR ANIMATION
let movingMarker = null; // The Car icon
let roadPath = []       // The list of dots from Google

// MAP & ROUTE FUNCTIONS
const initMap = async () => {
  // Unpack Map and Marker tools
  const { Map } = await importLibrary("maps");
  const { Marker } = await importLibrary("marker"); 
  const { DirectionsService, DirectionsRenderer } = await importLibrary("routes");

  // Initialize the map
  map = new Map(mapDiv.value, {
    center: { lat: 11.5564, lng: 104.9282 }, // Phnom Penh
    zoom: 13,
    disableDefaultUI: true,
    mapId: "USER_TRACKING_MAP", // Optional: for advanced styling
  });

  // Setup Directions
  directionsService = new DirectionsService();
  directionsRenderer = new DirectionsRenderer({
    map: map,
    polylineOptions: {
      strokeColor: "#1D4ED8", // Blue color for user route
      strokeWeight: 6
    }
  });

  // Create the Car Marker (Hidden until transit starts)
  movingMarker = new Marker({
    map: map,
    visible: false,
    icon: {
      url: "https://maps.google.com/mapfiles/kml/pal2/icon47.png",
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
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

      // 4. CAPTURE THE PATH (The train tracks for our car)
      roadPath = response.routes[0].overview_path;
      console.log("User side: Road path ready.");

    } else {
      console.error("Google Maps failed to find a route. Check addresses!");
    }
  });
};

// ANIMATION & REALTIME FUNCTIONS
const startTrackingAnimation = () => {
  if (movingMarker && roadPath.length > 0) {
    movingMarker.setVisible(true);
    // Make the car finish the trip in 20 seconds for the class demo
    animateMarkerAlongPath(movingMarker, roadPath, 40);
  }
};

const subscribeToStatusUpdates = () => {
  // Listen for changes to THIS specific delivery ID in Supabase
  statusSubscription = supabase
    .channel(`order-${item.delivery_id}`)
    .on(
      'postgres_changes',
      { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'createdeliveries', 
        filter: `delivery_id=eq.${item.delivery_id}` 
      },
      (payload) => {
        console.log("Realtime Update:", payload.new.status);
        // This triggers the watcher below
        item.status = payload.new.status; 
      }
    )
    .subscribe();
};

// UI EVENT HANDLERS
const openChat = async () => {
  if (!item) return;

  const conversation = await chatStore.createConversation(
    item.delivery_id,
    item.transporter_id
  );

  console.log(item.delivery_id,);
  console.log(item.transporter_id);
  console.log(conversation.id);
  
  if (!conversation?.id) return;

  chatStore.setActiveConversation(conversation.id, item.transporter_name);
  
  router.push("/chat");
};

// LIFECYCLE HOOKS
onMounted(async () => {
  if (item) {
    // Initialize the Map and Route
    await initMap();

    // START THE LISTENER
    subscribeToStatusUpdates();

    // DEMO LOGIC: If user opens page and it's already "in_transit", start car
    if (item.status === 'in_transit') {
      startTrackingAnimation();
    }
  }
});

// Cleanup
onUnmounted(() => {
  stopMarkerAnimation();
  if (statusSubscription) {
    supabase.removeChannel(statusSubscription);
  }
});

// WATCHER: React to status changes (for Realtime presentation)
watch(() => item.status, (newStatus) => {
  if (newStatus === 'in_transit') {
    startTrackingAnimation();
  } else if (newStatus === 'delivered') {
    const dest = { lat: Number(item.destination_lat), lng: Number(item.destination_lng) };
    stopMarkerAnimation(movingMarker, dest);
    // Hide car after 5 seconds
    setTimeout(() => movingMarker.setVisible(false), 5000);
  }
});
</script>
