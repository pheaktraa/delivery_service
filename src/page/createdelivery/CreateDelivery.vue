<template>
  <div class="max-w-[80rem] h-full m-auto p-[2rem] page">
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
        <form>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="pickupAddress" class="font-semibold mb-2"
                >Pickup Address</label
              >
              <input
                type="text"
                id="pickupAddress"
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
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="deliveryAddress" class="font-semibold mb-2"
                >Delivery Address</label
              >
              <input
                type="text"
                id="deliveryAddress"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="packageDetails" class="font-semibold mb-2"
                >Recipient Contact</label
              >
              <input
                type="text"
                id="packageDetails"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="packageDetails" class="font-semibold mb-2"
                >Type of Item</label
              >
              <select
                id="packageDetails"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              >
                <option value="" disabled selected>Select item type</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="fragile">Fragile Item</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <p
            class="text-[length:var(--text-title)] text-[var(--red-800)] font-semibold my-[2rem]"
          >
            Item Details
          </p>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="packageDetails" class="font-semibold mb-2"
                >Item Weight</label
              >
              <input
                type="text"
                id="packageDetails"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              />
            </div>
            <div class="flex flex-col">
              <label for="packageDetails" class="font-semibold mb-2"
                >Delivery Type</label
              >
              <select
                id="packageDetails"
                class="p-3 rounded-lg border-(--gray-300) border-2 focus:outline-none focus:border-(--red-800) bg-white"
              >
                <option value="" disabled selected>Select item type</option>
                <option value="electronics">Car</option>
                <option value="clothing">Motorcycle</option>
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
          </div>

          <div class="mt-[3rem]">
            <router-link to="/createdelivery/detail">
              <button
                type="button"
                class="w-full p-[0.9rem] text-[length:var(--text-description)] text-(--gray-100) font-semibold bg-[var(--red-800)] rounded-lg hover:from-(--red-800) hover:to-(--red-600) transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
              >
                Create Delivery
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedPayment = ref("");

function selectPayment(method) {
  selectedPayment.value = method;
}
</script>
