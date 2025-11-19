<template>
  <div class="flex items-center h-[100vh] relative">
    <div :class="['container', { 'right-panel-active': isRightPanelActive }]">
      <div class="form-container sign-up-container">
        <form action="#" @submit.prevent="handleRegister" class="form relative">
          <h1 class="h1">Create Account</h1>
          <div class="social-container">
            <a href="#" class="social a"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social a"
              ><i class="fab fa-google-plus-g"></i
            ></a>
            <a href="#" class="social a"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span class="span w-full">or use your email for registration</span>
          <input
            type="text"
            placeholder="Firstname"
            class="input text-gray-500"
            v-model="registerData.firstname"
            required
          />
          <input
            type="text"
            placeholder="Lastname"
            class="input text-gray-500"
            v-model="registerData.lastname"
            required
          />
          <input
            type="email"
            placeholder="Email"
            class="input text-gray-500"
            v-model="registerData.email"
            required
          />
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="input text-gray-500"
            v-model="registerData.password"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute bottom-[6.8rem] right-15 text-(--gray-400)"
          >
            <component :is="showPassword ? Eye : EyeOff" :size="20" />
          </button>
          <button
            class="button mt-2"
            :disabled="
              !registerData.firstname ||
              !registerData.lastname ||
              !registerData.email ||
              !registerData.password
            "
          >
            Sign Up
          </button>
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
            v-model="logindata.email"
            class="input text-gray-500"
            required
          />

          <input
            placeholder="Password"
            class="input text-gray-500"
            :type="showPassword ? 'text' : 'password'"
            v-model="logindata.password"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute bottom-[12.8rem] right-15 text-(--gray-400)"
          >
            <component :is="showPassword ? Eye : EyeOff" :size="20" />
          </button>

          <a href="#" class="span my-3">Forgot your password?</a>
          <button
            class="button"
            :disabled="!logindata.email || !logindata.password"
          >
            Sign In
          </button>
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
        <p v-else>{{ userStore.success }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userstore";
import { Eye, EyeOff } from "lucide-vue-next";

const userStore = useUserStore();

const logindata = ref({
  email: "",
  password: "",
});
const registerData = ref({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "user",
});

const showPassword = ref(false);
const showMessage = ref(false);
const isRightPanelActive = ref(false);

const activateSignUp = () => (isRightPanelActive.value = true);
const activateSignIn = () => (isRightPanelActive.value = false);

// Login
async function handleLogin() {
  if (!logindata.value.email || !logindata.value.password) {
    alert("Please fill all fields");
    return;
  }

  const res = await userStore.login(logindata.value);

  if (res.success) {
    showMessage.value = true;
    setTimeout(() => {
      window.location.href = "/home";
    }, 1500);
  }
}

// Register
async function handleRegister() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !registerData.value.firstname ||
    !registerData.value.lastname ||
    !registerData.value.email ||
    !registerData.value.password
  ) {
    showMessage.value = true;
    userStore.error = "Please fill all fields";
    setTimeout(() => (showMessage.value = false), 1500);
    return;
  }

  if (!emailPattern.test(registerData.value.email)) {
    alert("Please enter a valid email address");
    return;
  }

  const res = await userStore.register(registerData.value);

  showMessage.value = true;
  setTimeout(() => (showMessage.value = false), 1500);

  if (res.success) {
    activateSignIn();
  }
}
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
