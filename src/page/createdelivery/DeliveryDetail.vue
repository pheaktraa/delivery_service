<template>
  <div class="max-w-[80rem] h-full m-auto p-[2rem] page">
    <div class="mt-[2rem]">
      <div
        class="w-full h-full bg-(--gray-100) rounded-lg p-[2rem] sd"
        style="border: 2px solid var(--gray-200)"
      >
        <p
          class="text-[length:var(--text-title)] text-[var(--red-800)] font-semibold mb-[1rem]"
        >
          Order Confirmed!
        </p>
        <div
          class="text-[length:var(--text-description)] text-[var(--gray-800)]"
        >
          <p class="mb-[1rem]">Order Details:</p>
          <ul class="list-disc list-inside mb-[1rem]">
            <li>
              <strong>Pickup Address :</strong> {{ getdata?.pick_up_address }}
            </li>
            <li>
              <strong>Recipient Name :</strong> {{ getdata?.receiver_name }}
            </li>
            <li>
              <strong>Delivery Address :</strong>
              {{ getdata?.destination_address }}
            </li>
            <li>
              <strong>Recipient Contact :</strong>
              {{ getdata?.receiver_contact }}
            </li>
            <li>
              <strong>Type of Item :</strong> {{ getdata?.type_of_items }}
            </li>
            <li><strong>Item Weight :</strong> {{ getdata?.weight }}</li>
          </ul>

          <p class="mb-[1rem]">Pricing Detail:</p>
          <ul class="mb-[1rem]">
            <div class="border-t-3 w-[14.5rem] my-[1rem]"></div>
            <li>
              <strong>Subtotal :</strong> {{ getdata?.total_amount }} riel
            </li>
            <li><strong>Total :</strong> {{ getdata?.total_amount }} riel</li>
            <div class="border-t-3 w-[14.5rem] my-[1rem]"></div>
            <li><strong>Payment :</strong> {{ getdata?.payment_type }}</li>
          </ul>

          <button
            type="button"
            class="w-full p-[0.9rem] text-[length:var(--text-description)] text-[var(--gray-100)] font-semibold bg-[var(--red-800)] rounded-lg hover:bg-[var(--red-600)] transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
          >
            Confirm Order
          </button>

          <p class="mt-[1rem]">Thank you for using our delivery service!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useCreateDeliveryStore from "../../store/createDelivery";

const getdeliverybytoken = useCreateDeliveryStore();
const getdata = ref(null);

onMounted(async () => {
  const result = await getdeliverybytoken.getdeliverybyuser();

  // result is probably an array; pick the latest delivery
  if (result?.length > 0) {
    getdata.value = result[0]; // or sort by date if needed
  }
});
</script>
