
<template>
  <!-- main container -->
  <div class="max-w-[80rem] h-full m-auto page">
    
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-[2rem]">
      <div>
        <h1 class="text-3xl font-bold text-(---gray-800)">Order Detail</h1>
        <p class="text-(--gray-500)">Order ID: #{{ order.id }}</p>
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
        <div class="h-[400px] lg:h-auto relative">
          <!-- Real Embedded Map -->
          <iframe 
             :src="mapUrl" 
             width="100%" 
             height="100%" 
             style="border:0;" 
             loading="lazy">
          </iframe>
        </div>

        <!-- RIGHT COLUMN: DETAILS -->
        <div class="p-8 flex flex-col justify-between">
          
          <div class="space-y-6">
            <!-- Status Badge -->
            <div>
              <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase', 
                currentStep === 3 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700']">
                {{ currentStep === 0 ? 'Waiting for Driver' : (currentStep === 3 ? 'Completed' : 'In Progress') }}
              </span>
            </div>

            <!-- 1. FROM -->
            <div :class="['p-4 rounded-xl border transition', currentStep <= 1 ? 'border-red-500 bg-red-50' : 'border-gray-100']">
              <p class="text-xs font-bold text-(--gray-400) uppercase mb-1">From (Pickup)</p>
              <p class="text-xl font-bold text-(--gray-800)">{{ order.pickup }}</p>
              <div class="mt-[1rem] flex gap-2">
                <button class="text-xs bg-white border px-3 py-1 rounded font-bold">📞 {{ order.pickupPhone }}</button>
              </div>
            </div>

            <!-- 2. TO -->
            <div :class="['p-4 rounded-xl border transition', currentStep === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-100']">
              <p class="text-xs font-bold text-(--gray-400) uppercase mb-1">To (Dropoff)</p>
              <p class="text-xl font-bold text-(--gray-800)">{{ order.dropoff }}</p>
              <div class="mt-[1rem] flex gap-2">
                <button class="text-xs bg-white border px-3 py-1 rounded font-bold">📞 {{ order.dropoffPhone }}</button>
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
                <p class="font-bold text-green-600">${{ order.price }}</p>
                <p class="font-bold text-(--gray-800)">{{ order.paymentMethod }}</p>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = route.params.id

// 1. STATE: Track the delivery progress
// 0 = Job Offer (Not Accepted yet)
// 1 = Accepted (Heading to Pickup)
// 2 = Picked Up (Heading to Dropoff)
// 3 = Delivered
const currentStep = ref(0) 

// 2. MOCK DATA (Simulates fetching from Backend using ID)
const order = ref({
  id: orderId || '124815',
  status: 'Pending',
  pickup: 'Toul Kork, Street 315',
  pickupPhone: '012 999 888',
  dropoff: 'Boeung Kak, Street 598',
  dropoffPhone: '098 777 666',
  itemType: 'Electronic Parts',
  weight: '1kg',
  price: 5.00,
  paymentMethod: 'Cash on Delivery'
})

// 3. DYNAMIC MAP URL
// Switches map view based on where the driver needs to go
const mapUrl = computed(() => {
  if (currentStep.value <= 1) {
    // Show Pickup Location (Toul Kork)
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.773!2d104.890!3d11.570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519fe4077d69%3A0x20138e8221432e6!2sToul%20Kork!5e0!3m2!1sen!2skh"
  } else {
    // Show Dropoff Location (Boeung Kak)
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.6!2d104.91!3d11.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109514!2sBoeung%20Kak!5e0!3m2!1sen!2skh"
  }
})

// 4. ACTION HANDLER
const handleMainAction = () => {
  if (currentStep.value < 3) {
    currentStep.value++
    // Here you would call your API to update status
  } else {
    // If finished, go back to dashboard
    router.push('/accDelivery')
  }
}

// 5. BUTTON TEXT LOGIC
const buttonText = computed(() => {
  switch(currentStep.value) {
    case 0: return 'Accept Job'
    case 1: return '📦 Confirm Pickup'
    case 2: return '✅ Confirm Delivery'
    default: return 'Back to List'
  }
})
</script>