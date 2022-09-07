<template>
   <div class="w-1/3 p-8 mx-auto ">
      <div class="">
         <form @submit.prevent="auth()" method="post" class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div class="mb-4">
               <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
                  Username
               </label>
               <input
                  class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="username" type="text" placeholder="Username" v-model.trim="user.email">
            </div>
            <div class="mb-6">
               <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                  Password
               </label>
               <input
                  class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password" type="password" placeholder="*********" v-model.trim="user.password">
               
            </div>
            <div class="flex items-center justify-between">
               <button
                  class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit">
                  Sign In
               </button>
               <a class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800" href="#">
                  Forgot Password?
               </a>
            </div>
         </form>
         <p class="text-lg text-center text-gray-500">
            No account?  <router-link to="/sign"> <span class="text-red-500">Sign up</span> </router-link>
         </p>
      </div>
   </div>
</template>

<script setup>
   
import {ref,reactive,onMounted} from 'vue'
import axios from 'axios'

const user=reactive ({
   email:'',
   password:'',
  
})

const getAuthUser = async () => {
console.log(window.localStorage.getItem('token'));
axios.get("http://localhost:5173/api/users/profile", {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
      },
   })
   .then(response => {
      console.log(response);
      window.localStorage.setItem('auth_user_role', response.data.role);
      window.location.href = "/";
   });
};

const auth = async ()=>{
   console.log(user);
   axios.post("http://localhost:5173/api/auth/login", user, {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
   })
   .then(response => {
      console.log(response);
      window.localStorage.setItem('token', response.data.token);
      getAuthUser();
      // window.location.href = "/";
   })
   .catch(error => {    
      if([400,401].includes(error.response.data.statusCode)) {
         alert(error.response.data.message);
      }  
      console.error("There was an error!", error);
    });
}

</script>