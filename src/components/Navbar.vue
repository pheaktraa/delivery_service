<template>
  <nav class="w-full h-[4.25rem] fixed z-50">
    <div
      class="max-w-[80rem] h-full m-auto flex items-center justify-between"
    >
      <img src="../assets/img/logo.png" alt="" class="h-[7rem] ml-[-1.25rem]" />
      <ul class="flex gap-9">
        <router-link
          v-for="(menu, index) in listmenu"
          :key="index"
          class="font-semibold"
          :to="menu.path"
        >
          {{ menu.name }}
        </router-link>
      </ul>
      <ul class="flex gap-6">
        <li
          v-for="(menuloginsignup, index) in loginmenu"
          :key="index"
          class="font-semibold px-5 py-2 w-[7rem] text-center rounded-[.5rem] [li:nth-child(2)&]:bg-[var(--gray-300)] [li:nth-child(1)&]:bg-[var(--red-800)] [li:nth-child(1)&]:text-white"
        >
          {{ menuloginsignup.name }}
        </li>
      </ul>
      <ul class="flex gap-2 items-center" v-if="showacc > 2">
        <li class="font-semibold">Username</li>
        <li>
          <img
            src="../assets/icon/account_circle.svg"
            alt=""
            class="w-[2rem]"
          />
        </li>
        <li></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const listmenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Create Delivery",
    path: "/createdelivery",
  },
  {
    name: "My Deliveries",
    path: "/mydeliveries",
  },
  {
    name: "About Us",
    path: "/aboutus",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const loginmenu = [
  {
    name: "LOGIN",
    path: "/login",
  },
  {
    name: "SIGN UP",
    path: "/signup",
  },
];

const showacc = 1;

const changeColor = () => {
  const scrollY = window.scrollY;
  const nav = document.querySelector("nav");
  if (scrollY >= 50) {
    nav.style.backgroundColor = "var(--gray-200)";
  } else {
    nav.style.backgroundColor = "var(--gray-100)";
  }
};

window.addEventListener("scroll", changeColor);

</script>
