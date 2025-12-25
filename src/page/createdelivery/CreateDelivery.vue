<template>
  <div class="max-w-[80rem] h-full m-auto p-[2rem] page relative">
    <!-- <p
      class="text-[length:var(--text-title)] text-[var(--red-800)] font-semibold"
    >
      Create Delivery
    </p> -->
    <div class="mt-[2rem]">
      <div
        class="w-full h-full bg-(--gray-100) rounded-lg p-[2rem] sd"
        style="border: 2px solid var(--gray-200)"
      >
        <p
          class="text-[length:var(--text-title)] text-[var(--red-800)] font-semibold mb-[1rem]"
        >
          Enter Form
        </p>
        <form @submit.prevent="handleCreateDelivery">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="pickupAddress" class="font-semibold mb-2"
                >Pickup Address</label
              >
              <!-- Pickup Address -->
              <input
                ref="pickupInput" 
                type="text"
                id="pickupAddress"
                v-model="deliveryData.pick_up_address"
                placeholder="Search for pickup location..."
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="recipientName" class="font-semibold mb-2"
                >Recipient Name</label
              >
              <input
                type="text"
                id="recipientName"
                v-model="deliveryData.receiver_name"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="deliveryAddress" class="font-semibold mb-2"
                >Delivery Address</label
              >
              <!-- Delivery Address -->
              <input
                ref="deliveryInput" 
                type="text"
                id="deliveryAddress"
                v-model="deliveryData.destination_address"
                placeholder="Search for destination..."
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="recipientContact" class="font-semibold mb-2"
                >Recipient Contact</label
              >
              <input
                type="tel"
                id="recipientContact"
                v-model="deliveryData.receiver_contact"
                placeholder="012345678"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="itemType" class="font-semibold mb-2"
                >Type of Item</label
              >
              <select
                id="itemType"
                v-model="deliveryData.type_of_items"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              >
                <option value="" disabled selected>Select item type</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="fragile">Fragile Item</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label class="font-semibold mb-2">Item Size</label>
              <div class="flex gap-3">
                <button
                  type="button"
                  class="payment-btn flex-1 p-3 border-2 rounded-lg border-[var(--gray-300)] hover:bg-[var(--red-800)] transition-colors duration-300 hover:text-white"
                  @click="selectitemsize('S')"
                  :class="
                    selectedItemSize === 'S'
                      ? 'bg-[var(--red-800)] text-white'
                      : 'bg-white'
                  "
                >
                  S
                </button>

                <button
                  type="button"
                  class="payment-btn flex-1 p-3 border-2 rounded-lg border-[var(--gray-300)] hover:bg-[var(--red-800)] transition-colors duration-300 hover:text-white"
                  @click="selectitemsize('M')"
                  :class="
                    selectedItemSize === 'M'
                      ? 'bg-[var(--red-800)] text-white'
                      : 'bg-white'
                  "
                >
                  M
                </button>
                <button
                  type="button"
                  class="payment-btn flex-1 p-3 border-2 rounded-lg border-[var(--gray-300)] hover:bg-[var(--red-800)] transition-colors duration-300 hover:text-white"
                  @click="selectitemsize('L')"
                  :class="
                    selectedItemSize === 'L'
                      ? 'bg-[var(--red-800)] text-white'
                      : 'bg-white'
                  "
                >
                  L
                </button>
              </div>
              <input
                type="hidden"
                id="paymentMethod"
                name="payment_method"
                :value="selectedPayment"
              />
            </div>
          </div>
          <p
            class="text-[length:var(--text-title)] text-[var(--red-800)] font-semibold my-[2rem]"
          >
            Item Details
          </p>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="itemWeight" class="font-semibold mb-2"
                >Item Weight: Kg</label
              >
              <input
                type="number"
                step="0.1"
                min="0.1"
                id="itemWeight"
                v-model="deliveryData.weight"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="deliveryType" class="font-semibold mb-2"
                >Delivery Type</label
              >
              <select
                id="deliveryType"
                v-model="deliveryData.type_of_delivery"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              >
                <option value="" disabled selected>Select delivery type</option>
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label class="font-semibold mb-2">Payment Method</label>
              <div class="flex gap-3">
                <button
                  type="button"
                  class="payment-btn flex-1 p-3 border-2 rounded-lg border-[var(--gray-300)] hover:bg-[var(--red-800)] transition-colors duration-300 hover:text-white"
                  @click="selectPayment('cash')"
                  :class="
                    selectedPayment === 'cash'
                      ? 'bg-[var(--red-800)] text-white'
                      : 'bg-white'
                  "
                >
                  Cash on Delivery
                </button>

                <button
                  type="button"
                  class="payment-btn flex-1 p-3 border-2 rounded-lg border-[var(--gray-300)] hover:bg-[var(--red-800)] transition-colors duration-300 hover:text-white"
                  @click="selectPayment('ABA')"
                  :class="
                    selectedPayment === 'ABA'
                      ? 'bg-[var(--red-800)] text-white'
                      : 'bg-white'
                  "
                >
                  ABA
                </button>
                <button
                  type="button"
                  class="payment-btn flex-1 p-3 border-2 rounded-lg border-[var(--gray-300)] hover:bg-[var(--red-800)] transition-colors duration-300 hover:text-white"
                  @click="selectPayment('ACLEDA')"
                  :class="
                    selectedPayment === 'ACLEDA'
                      ? 'bg-[var(--red-800)] text-white'
                      : 'bg-white'
                  "
                >
                  ACLEDA
                </button>
              </div>
              <input
                type="hidden"
                id="paymentMethod"
                name="payment_method"
                :value="selectedPayment"
              />
            </div>
            <input type="hidden" v-model="deliveryData.total_amount" />
          </div>

          <div class="mt-[3rem]">
            <button
              type="submit"
              class="w-full p-[0.9rem] text-[length:var(--text-description)] text-(--gray-100) font-semibold bg-[var(--red-800)] rounded-lg hover:from-(--red-800) hover:to-(--red-600) transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
            >
              Create Delivery
            </button>
          </div>
        </form>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showMessage"
        class="fixed top-2/12 right-1/12 w-[20rem] py-3 px-4 text-center rounded-lg z-2"
        :class="
          createDeliveryStore.error
            ? 'bg-red-500 text-white'
            : 'bg-green-500 text-white'
        "
      >
        <p v-if="createDeliveryStore.error">{{ createDeliveryStore.error }}</p>
        <p v-else>{{createDeliveryStore.success }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import useCreateDeliveryStore from "../../store/createDelivery";
import { setupAutocomplete } from "../../utils/googleMaps";


const router = useRouter();
const createDeliveryStore = useCreateDeliveryStore();
const showMessage = ref(false)

const pickupInput = ref(null);
const deliveryInput = ref(null);

const deliveryData = ref({
  pick_up_address: "",
  pickup_lat: null,
  pickup_lng: null,
  destination_lat: null,
  destination_lng: null,
  receiver_name: "",
  destination_address: "",
  receiver_contact: "",
  type_of_items: "",
  itemsize: "",
  weight: "",
  type_of_delivery: "",
  payment_type: "",
  total_amount: 0,
});

// Initialize Google Maps Autocomplete
onMounted(async () => {
  // Setup Pickup
  await setupAutocomplete(pickupInput.value, (data) => {
    deliveryData.value.pick_up_address = data.address;
    deliveryData.value.pickup_lat = data.lat;
    deliveryData.value.pickup_lng = data.lng;
    
    // Check your console when you click a suggestion!
    console.log("Captured Pickup Coordinates:", data.lat, data.lng);
  });

  // Setup Destination
  await setupAutocomplete(deliveryInput.value, (data) => {
    deliveryData.value.destination_address = data.address;
    deliveryData.value.destination_lat = data.lat;
    deliveryData.value.destination_lng = data.lng;
    
    console.log("Captured Destination Coordinates:", data.lat, data.lng);
  });
});

const selectedPayment = ref("");
const selectedItemSize = ref("");

const sizeMultiplier = { S: 1, M: 1.5, L: 2 };

const priceitemweight = computed(() => {
  const weight = Number(deliveryData.value.weight);
  const multiplier = sizeMultiplier[deliveryData.value.itemsize] || 1;
  return weight * 0.50 * multiplier;
});

watch(priceitemweight, (newVal) => {
  deliveryData.value.total_amount = newVal;
});

function selectPayment(method) {
  selectedPayment.value = method;
  deliveryData.value.payment_type = method;
}

function selectitemsize(size) {
  selectedItemSize.value = size;
  deliveryData.value.itemsize = size;
}

async function handleCreateDelivery() {
  const values = deliveryData.value;

  // FRONTEND VALIDATION GENERAL FIELD CHECK (Check if anything is empty first)
  if (
    !values.pick_up_address ||
    !values.receiver_name ||
    !values.destination_address ||
    !values.receiver_contact ||
    !values.type_of_items ||
    !values.itemsize ||
    !values.weight ||
    !values.type_of_delivery ||
    !values.payment_type // should comment it out
  ) {
    createDeliveryStore.error = "Please fill all fields";
    createDeliveryStore.success = null;
    showMessage.value = true;
    setTimeout(() => (showMessage.value = false), 2500);
    return;
  }

  // WEIGHT VALIDATION (Check if weight is a valid positive number)
  const weightNum = Number(values.weight);
  if (isNaN(weightNum) || weightNum <= 0) {
    createDeliveryStore.error = "Weight must be a valid number greater than 0";
    showMessage.value = true;
    setTimeout(() => (showMessage.value = false), 2500);
    return;
  }

  // PHONE VALIDATION
  const phoneRegex = /^[0-9+]{8,15}$/; 
  if (!phoneRegex.test(values.receiver_contact)) {
    createDeliveryStore.error = "Please enter a valid phone number (8-15 digits)";
    showMessage.value = true;
    setTimeout(() => (showMessage.value = false), 2500);
    return;
  }

  // MAP COORDINATE CHECK (Ensure they used the Google Autocomplete)
  if (!values.pickup_lat || !values.destination_lat) {
    createDeliveryStore.error = "Please select addresses from the suggestions dropdown";
    showMessage.value = true;
    setTimeout(() => (showMessage.value = false), 2500);
    return;
  }

  // Clear messages before API call
  createDeliveryStore.error = null;
  createDeliveryStore.success = null;

  console.log("DATA BEING SENT TO STORE:", JSON.stringify(values, null, 2));

  // --- API REQUEST ---
  console.log("SENDING TO STORE:", values);
  const res = await createDeliveryStore.createDelivery(values);

  // SUCCESS
  if (res && res.success) {
    createDeliveryStore.success = "Delivery created successfully!";
    showMessage.value = true;

    setTimeout(() => {
      showMessage.value = false;
      router.push("/createdelivery/detail");
    }, 2000);
  } 
  // ERROR
  else {
    createDeliveryStore.error = res?.error || "Failed to create delivery";
    showMessage.value = true;
    setTimeout(() => (showMessage.value = false), 2500);
  }
}

</script>
