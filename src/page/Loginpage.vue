<template>
  <div class="flex items-center h-[100vh] relative">
    <div :class="['container', { 'right-panel-active': isRightPanelActive }]">
      <div class="form-container sign-up-container">
        <form action="#" class="form">
          <h1 class="h1">Create Account</h1>
          <div class="social-container">
            <a href="#" class="social a"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social a"
              ><i class="fab fa-google-plus-g"></i
            ></a>
            <a href="#" class="social a"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span class="span w-full">or use your email for registration</span>
          <input type="text" placeholder="Firstname" class="input" />
          <input type="text" placeholder="Lastname" class="input" />
          <input type="email" placeholder="Email" class="input" />
          <input type="password" placeholder="Password" class="input" />
          <button class="button mt-2">Sign Up</button>
        </form>
      </div>

      <div class="form-container sign-in-container">
        <form @submit.prevent="handleLogin" class="form relative">
          <h1 class="h1">Sign in</h1>
          <div class="social-container">
            <a href="#" class="social a"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social a"
              ><i class="fab fa-google-plus-g"></i
            ></a>
            <a href="#" class="social a"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span class="span">or use your account</span>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="input"
          />

          <input
            placeholder="Password"
            class="input"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute bottom-[12.7rem] right-20 text-gray-500 hover:text-gray-700"
          >
            {{ showPassword ? "Hide" : "Show" }}
          </button>

          <a href="#" class="span my-3">Forgot your password?</a>
          <button class="button">Sign In</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 class="h1">Welcome Back!</h1>
            <p class="p">
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost button" @click="activateSignIn">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 class="h1">Hello, Friend!</h1>
            <p class="p">
              Enter your personal details and start journey with us
            </p>
            <button class="ghost button" @click="activateSignUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showMessage"
        class="absolute top-1/12 left-10/12 -translate-x-1/2 w-[16rem] py-3 px-4 text-center rounded-lg z-2"
        :class="
          userStore.error ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        "
      >
        <p v-if="userStore.error">{{ userStore.error }}</p>
        <p v-else>Succeed</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userstore";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const showMessage = ref(false);
const userStore = useUserStore();
const isRightPanelActive = ref(false);

const activateSignUp = () => {
  isRightPanelActive.value = true;
};

const activateSignIn = () => {
  isRightPanelActive.value = false;
};

const handleLogin = async () => {
  await userStore.login(email.value, password.value);

  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 1500);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
