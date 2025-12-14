<template>
  <div class="max-w-[80rem] h-full p-[2rem] m-auto py-[12rem]">

    <div class="w-[20rem] h-[10rem] bg-(--gray-100) rounded p-2 relative" style="border: 2px solid var(--gray-200)"
      v-for="(item, index) in getdata" :key="index">
      <p>{{item.pick_up_address}}</p>
      <p>Itemsize</p>
      <p>Type of delivery</p>
      <button class="bg-(--red-800) text-white px-[2rem] py-[0.25rem] absolute left-7/12 bottom-3 rounded" type="submit">Accept</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref , onMounted} from 'vue';
import useCreateDeliveryStore from '../../store/createDelivery';

const userstoredelivery = useCreateDeliveryStore();
const getdata = ref()

onMounted(async () => {
  const result = await userstoredelivery.getalldelivery();
  getdata.value = result.deliveries.data; 
})
console.log(getdata.value);
</script>