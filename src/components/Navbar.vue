<template>
  <nav class="w-full h-[4.25rem] fixed z-50 top-0">
    <div class="max-w-[80rem] h-full m-auto flex items-center justify-between">
      <img src="../assets/img/logo.png" alt="" class="h-[7rem] ml-[-1.25rem]" />
      <ul class="flex gap-9 menu">
        <router-link
          v-for="(menu, index) in listmenu"
          :key="index"
          class="font-semibold hover:text-[var(--red-800)] list py-[.25rem]"
          :to="menu.path"
        >
          {{ menu.name }}
        </router-link>
      </ul>
      <ul class="flex gap-2 items-center" v-if="showacc">
        <li class="font-semibold">{{ user.username }}</li>
        <li>
          <img
            src="../assets/icon/account_circle.svg"
            alt=""
            class="w-[2rem]"
          />
        </li>
        <li></li>
      </ul>
      <ul class="flex gap-6" v-else>
        <router-link
          v-for="(menuloginsignup, index) in loginmenu"
          :key="index"
          :to="menuloginsignup.path"
          class="[&:nth-child(1)_li]:bg-[var(--red-800)] [&:nth-child(1)_li]:text-white [&:nth-child(2)_li]:bg-[var(--gray-300)]"
        >
          <li
            class="font-semibold px-5 py-2 w-[7rem] text-center rounded-[.5rem]"
          >
            {{ menuloginsignup.name }}
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import getUserPayload from "../utils/jwt";
import { ref } from "vue";

const listmenu = [
  {
    name: "Home",
    path: "/home",
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
    path: "/auth/login",
  },
  {
    name: "SIGN UP",
    path: "/signup",
  },
];

const showacc = ref(false);
const user = getUserPayload();

if (user && user.role === "user") {
  showacc.value = true;
  console.log(user.role);
  console.log(user.username);
  
}

const changeColor = () => {
  const scrollY = window.scrollY;
  const nav = document.querySelector("nav");
  if (scrollY >= 50) {
    nav.style.backgroundColor = "var(--gray-100)";
    nav.style.boxShadow =
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px";
  } else {
    nav.style.backgroundColor = "white";
    nav.style.boxShadow =
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px";
  }
};

window.addEventListener("scroll", changeColor);
</script>
