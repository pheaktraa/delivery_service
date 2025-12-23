<template>
  <div class="max-w-[80rem] h-full m-auto page">
    <div class="mt-[2rem] bg-(--gray-100) p-[2rem] rounded-lg sd">
      <div class="border-b-[2px] border-(--gray-300) pt-[2rem] pb-[2rem]">
        <p class="text-(--red-800) text-[length:var(--text-title)] font-bold">
          My Deliveries Details
        </p>
      </div>

      <!-- Items Details -->
      <div class="w-full h-full overflow-x-auto mt-[2rem] mb-[1rem]">
        <div
          v-if="item"
          class="w-full h-full grid grid-cols-2 gap-[2rem] p-[2rem] border-0 border-(--gray-300) rounded-lg bg-white"
        >
          <div
            class="border border-(--gray-300) rounded-lg p-[1rem] flex items-center justify-center"
          >
            <img
              :src="getImage(item.image)"
              alt=""
              class="w-[20rem] h-[20rem] object-cover"
            />
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
              <div class="flex flex-col gap-2 items-end">
                <button
                  class="text-(--gray-100) border border-(--red-900) rounded-lg p-[.5rem] bg-(--red-700) hover:bg-(--red-800) hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>
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
import { useDeliveryStore } from "../../store/myDeliveryStore";
import useChatStore from "../../store/chatStore";
import { useRouter } from "vue-router";

const router = useRouter();
const chatStore = useChatStore();
const store = useDeliveryStore();
const item = store.selectedDelivery;
const show = 0; // placeholder, update if needed

const getImage = (name) => {
  return new URL(`../../assets/img/${name}`, import.meta.url).href;
};

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


</script>
