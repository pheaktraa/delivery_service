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
        <div class="text-[length:var(--text-description)] text-(--gray-800)">
          <p class="mb-[1rem]">Order Details:</p>
          <ul class="list-disc list-inside mb-[1rem]">
            <li><strong>Pickup Address :</strong> Mean chey, Phnom Penh</li>
            <li><strong>Recipient Name :</strong> hehe</li>
            <li><strong>Delivery Address :</strong> Wat Phnom, Phnom Penh</li>
            <li><strong>Recipient Contact :</strong> 085 251 742</li>
            <li><strong>Type of Item :</strong> Medium box, fragile</li>
            <li><strong>Item Weight :</strong> 2 kg</li>
          </ul>
          <p class="mb-[1rem]">Pricing Detail:</p>
          <ul class="mb-[1rem]">
            <li><strong>Base delivery fee :</strong> 2000 riel</li>
            <li><strong>Distance fee :</strong> 1000 riel</li>
            <div class="border-t-3 w-[14.5rem] my-[1rem]"></div>
            <li><strong>Subtotal :</strong> 12000 riel</li>
            <li><strong>Total :</strong> 12000 riel</li>
            <div class="border-t-3 w-[14.5rem] my-[1rem]"></div>
            <li><strong>Payment :</strong> Cash</li>
          </ul>
          <button
            type="button"
            class="w-full p-[0.9rem] text-[length:var(--text-description)] text-(--gray-100) font-semibold bg-[var(--red-800)] rounded-lg hover:from-(--red-800) hover:to-(--red-600) transition-all duration-300 hover:scale-102 hover:shadow-lg border-0"
          >
            Confirme Order
          </button>
          <p class="mt-[1rem]">Thank you for using our delivery service!</p>
        </div>
      </div>
    </div>
  </div>
</template>
