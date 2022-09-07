<template>

  <!-- VERTICAL NAVBAR -->

  <body class=" bg-gray-50 border-1">
    <div
      class="flex items-center justify-between w-full p-2 text-gray-800 bg-gray-500 hover:text-black focus:outline-none focus:text-black">
      <button class="flex items-center justify-between space-x-3">

        <router-link to="/">
          <div class="flex items-center space-x-2">
            <img src="./assets/11.png" alt="logo" width="60" height="60" />
            <p class="text-2xl leading-6 text-white">LOGO</p>
          </div>
        </router-link>

      </button>

      <div class="flex mr-6 space-x-4">

        <button v-if="auth_user_role == 'ADMIN'"
          class="px-4 py-2 font-bold text-white bg-gray-400 rounded-full hover:bg-gray-600">
          <router-link to="/book">Addbook</router-link>
        </button>



        <button @click.prevent="logOut" v-if="!guestRoutes.includes(this.$route.name)"
          class="px-4 py-2 font-bold text-white bg-gray-400 rounded-full hover:bg-gray-600">
          LOG OUT
        </button>




      </div>
    </div>
    <div class="flex ">
      <div id="Main"
        class="flex flex-col items-start justify-start w-full h-auto transition duration-500 ease-in-out transform bg-gray-300 border-2 xl:translate-x-0 sm:w-72 border-r-4-gray-200">
        <div class="flex flex-col items-start justify-start w-full px-4 pb-5 space-y-3 xl:mt-3">
          <div
            class="relative flex items-center w-full mt-3 text-gray-800 border border-gray-300 rounded focus:outline-none jusitfy-start focus:border-gray-400">
            <input type="text" placeholder="Search"
              class="w-full py-3 pl-8 text-base leading-4 placeholder-gray-800 rounded placeholder-text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600" />
          </div>
          <button
            class="flex items-center w-full py-3 pl-1 text-gray-600 rounded focus:outline-none jusitfy-start hover:text-white focus:bg-indigo-400 focus:text-white hover:bg-indigo-300">
            <router-link to="/first" class="flex items-center space-x-2 "><img src="./assets/icon book.png" width="55">
              <p class="text-base font-bold leading-4">RUSSIAN BOOKS</p>
            </router-link>

          </button>
          <button
            class="flex items-center w-full py-3 pl-1 text-gray-600 rounded focus:outline-none jusitfy-start hover:text-white focus:bg-indigo-400 focus:text-white hover:bg-indigo-300">
            <router-link to="/second" class="flex items-center space-x-2"><img src="./assets/icon book.png" width="55">
              <p class="text-base font-bold leading-4">FANTASTIC BOOKS</p>
            </router-link>
          </button>
          <button
            class="flex items-center justify-start w-full py-3 pl-1 text-gray-600 rounded focus:outline-none hover:text-white focus:bg-indigo-400 focus:text-white hover:bg-indigo-300">
            <router-link to="/third" class="flex items-center space-x-2"><img src="./assets/icon book.png" width="55">
              <p class="text-base font-bold">CATEGORY 3</p>
            </router-link>
          </button>
        </div>

      </div>
      <router-view />

    </div>

  </body>



  <!-- FOOTER -->

  <footer class="bottom-0 w-full p-4 text-center text-white bg-gray-500">
    <div class="text-md ">© 2022 <a href="https://flowbite.com/" class=" hover:underline">LOGO™</a>.
      All Rights Reserved.
    </div>
  </footer>
</template>







<script setup>
import { ref,onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';

const router = useRouter();
const isActive=ref(true)

function logOut(){
  
  localStorage.clear();
  router.push({name:'login'})
  
}


let auth_user_role = ref(0);
auth_user_role = window.localStorage.getItem('auth_user_role')
let guestRoutes = ref('');
guestRoutes = ['login', 'sign'];

onMounted(() => {
  const route = useRoute();
  console.log(route.name)
})
</script>

<style>
</style>
