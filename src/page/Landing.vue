<template>
    <!-- container  -->
    <div class="max-w-[80rem] h-full m-auto p-[2rem] mt-[5rem] bg-white">
        <!-- content container first section -->
        <div class="flex flex-row px-5 w-full items-start">
            <!-- box left side  -->
            <div class="flex flex-column flex-1 flex-wrap">
                <p class="text-black text-[length:var(--text-title)] font-semibold">Fast ,
                    <span class="text-[var(--red-700)]"> Reliable Deliveries</span> In Cambodia
                </p>

                <p class="text-black text-[length:var(--text-description)] font-normal">
                    Request deliveries from trusted companies and track them in real time all in one platform
                </p>

                <!-- btn -->
                <button class="mt-[2rem] bg-(--red-700) text-white 
                    font-bold py-3 px-6 rounded-2xl shadow-lg hover:bg-(--red-800) 
                    focus:outline-none focus:ring-2 focus:ring-(--red-400)">
                    Get Started
                </button>
            </div>

            <!-- position approch -->
            <div class="flex flex-1 items-center justify-center p-2 rounded-xl">
                <div class="relative w-full h-[20rem] bg-white p-4 rounded-[1rem] overflow-hidden">
                    <!-- Gray background layer (the actual gray area) -->
                    <div class="absolute inset-4 bg-(--gray-100) rounded-[1rem]"></div>

                    <!-- Images (moved outside z-10 wrapper) -->
                    <div class="z-30">
                        <img src="../assets/img/delivery01.png" alt="delivery01"
                            class="absolute p-4 bottom-0 left-0 w-[55%] h-[55%] object-contain">

                        <img src="../assets/img/location.png" alt="delivery01"
                            class="absolute p-4 top-0 right-0 w-[55%] h-[55%] object-contain">
                    </div>

                    <!-- Overlay boxes -->
                    <div class="absolute inset-4 z-20 flex flex-col justify-between pointer-events-none">
                        <div class="self-start w-[35%] h-[35%] bg-(--gray-100) rounded-lg overflow-hidden
                             outline-white outline-[2rem] outline-offset-[0]">
                            <img class="w-full h-full object-contain p-4" src="../assets/img/trade.png"
                                alt="trade">
                        </div>
                        <div class="self-end w-[35%] h-[35%] bg-(--gray-100) rounded-lg overflow-hidden 
                                outline-white outline-[2rem] outline-offset-[0]">
                            <img class="w-full h-full object-contain p-4" src="../assets/img/delivery02.png" alt="delivery02">
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- container second section  -->
        <div class="flex px-5 w-full mt-[10rem] gap-20">
            <!-- box left side (img) -->
            <div class="flex flex-1 bg-white border-(--red-700) border-2 rounded-[1rem]">
                <img class="w-full h-70 object-contain" src="../assets/img/holding-board.jpg" alt="holding-board">
            </div>
            <!-- box on right side -->
            <div class="flex flex-1 flex-column flex-wrap">
                <!-- content -->
                <div class="text-black font-bold text-justify ">
                    <p class="text-(--red-700) text-[2rem]">3 step process</p>
                    <ul style="list-style-type: disc;">
                        <li>
                            <p class="mt-[2rem]">Create Delivery Request enter sender and receiver details.</p>
                        </li>
                        <li>
                            <p class="mt-[2rem]">Pick a Delivery Company choose from available providers.</p>
                        </li>
                        <li>
                            <p class="mt-[2rem]">Track Your Packges monitor status in real time.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- container second section  -->
        <div class="flex px-5 w-full mt-[5rem] gap-20">
            <!-- box left -->
            <div class="flex flex-1">
                <!-- content -->
                <div class="text-black font-bold text-justify">
                    <p class="text-(--red-700) text-[2rem]">People who trust our journey</p>
                    <p>Discover why people choose us for effortless delivery, real-time updates, and a supportive
                        community.</p>
                </div>
            </div>
            <!-- box on right side -->
            <div class="flex flex-1 flex-column">
                <!-- content company logo -->
                <div class="flex gap-5 flex-wrap ">
                    <img class="w-[15rem] h-[10rem] bg-white border-(--red-700) border-2 p-0 rounded-[1rem] object-contain"
                        src="https://files.logistics.gov.kh/content/cms/mpwt_logo_2c03938805.png" alt="lebron">
                    <img class="w-[15rem] h-[10rem] border-(--red-700) border-2 p-0 rounded-[1rem] object-fill"
                        src="https://www.khmertimeskh.com/wp-content/uploads/2023/02/Ministry-of-Economy-and-Finance.jpg"
                        alt="lebron">
                </div>
            </div>
        </div>

        <!-- container third section -->
        <div class="flex px-5 w-full mt-[5rem] gap-10">
            <!-- container left -->
            <div class="flex flex-1 flex-col gap-4 items-end">
                <!-- title -->
                <div class="text-black font-bold">
                    <p class="text-(--red-700) text-[length:var(--text-title)] font-semibold">Shop, track, and</p>
                </div>
                <!-- card -->
                <div
                    class="text-black flex flex-col w-[70%] items-start bg-(--gray-100) rounded-[1rem] p-8 sd">
                    <img src="/src/assets/icon/location.svg" alt="location" class="w-6 h-6">
                    <p class="text-(--red-700) font-bold">Track your oder live</p>
                    <p class="pt-[1rem]">Follow your Packges in real time, from checkout to doorstep. Stay in the loop
                        with every update-no
                        suprises, just smooth deliveries.
                    </p>
                </div>
                <!-- card -->
                <div
                    class="text-black flex flex-col w-[70%] items-start bg-(--gray-100) rounded-[1rem] p-8 sd h-[14rem]">
                    <img src="/src/assets/icon/account_circle.svg" alt="location" class="w-6 h-6">
                    <p class="text-(--red-700) font-bold">Personalize your profile</p>
                    <p class="pt-[1rem]">Easily update your information, items, and manage your inventory.
                    </p>
                </div>
            </div>

            <!-- container right -->
            <div class="flex flex-1 flex-col gap-4 items-start">
                <!-- title -->
                <div class="text-black font-bold mt-[1rem]">
                    <p class="text-black text-[length:var(--text-title)] font-semibold">customize easily</p>
                </div>
                <!-- card -->
                <div
                    class="text-black flex flex-col w-[70%] items-start bg-(--gray-100) rounded-[1rem] p-8 sd">
                    <img src="../assets/icon/card.svg" alt="card" class="w-6 h-6">
                    <p class="text-(--red-700) font-bold">See every product detail</p>
                    <p class="pt-[1rem]">Instantly view your order's status, delivery progress, and product info.
                        Everything
                        you need is right at your fingertips, clear and simple.
                    </p>
                </div>
                <!-- card -->
                <div
                    class="text-black flex flex-col w-[70%] items-start bg-(--gray-100) rounded-[1rem] p-8 sd">
                    <img src="../assets/icon/truck.svg" alt="truck" class="w-6 h-6">
                    <p class="text-(--red-700) font-bold">Simple, easy delivery</p>
                    <p class="pt-[1rem]">Enjoy a seamless experience from browsing to delivery. We keep things clear,
                        easy, and
                        welcoming for anyone to use service.
                    </p>
                </div>
            </div>
        </div>


        <!-- container feedback -->
        <div class="flex flex-col px-5 w-full mt-[5rem]">
            <!-- content -->
            <div class="">
                <p class="text-(--red-700) text-[length:var(--text-title)] font-semibold">Customer Feedback</p>
            </div>
            <!-- scroll container -->
            <div id="feedbackContainer"
                class="overflow-x-auto overflow-y-hidden flex flex-nowrap gap-5 mt-[2rem] scroll-smooth px-4 h-[15rem] snap-x snap-mandatory hide-scrollbar py-2">
                <!-- card -->
                <div
                    class="text-black text-justify w-[30rem] bg-(--gray-100) rounded-[1rem] flex flex-col items-start p-6 sd snap-start h-[auto] flex-shrink-0 " v-for="(rate,index) in ratings" :key="index">

                    <!-- icon + username -->
                    <div class="flex gap-3 w-full">
                        <img src="../assets/icon/account_circle.svg" alt="account">
                        <p class="text-(--red-700) font-bold">{{ rate.username }}</p>
                    </div>
                    <!-- body text -->
                    <p class="pt-[1rem] line-clamp-5">{{ rate.rating_text }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useUserRatingStore from '../store/userRating';

const userRatingStore = useUserRatingStore();
const ratings = ref([]);

onMounted(async () => {
  const result = await userRatingStore.fetchRatings();
  ratings.value = result;
});
</script>



<style>

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}


.hide-scrollbar {
  -ms-overflow-style: none; 
  scrollbar-width: none;    
}

</style>