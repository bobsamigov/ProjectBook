
<template>
   <div class="w-1/3 p-8 mx-auto">
      <div class="flex flex-col justify-center bg-grey-lighter">
         <div class="container flex flex-col items-center justify-center flex-1 px-2 mx-auto">
            <div class="w-full px-6 py-8 text-black bg-white rounded shadow-md">
               <form @submit.prevent="registration()" method="post">
                  <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                  <input type="text" class="block w-full p-3 mb-4 border rounded border-grey-light" name="fullname"
                     placeholder="Full Name" v-model.trim="user.fullName" />

                  <input type="text" class="block w-full p-3 mb-4 border rounded border-grey-light" name="email"
                     placeholder="Email" v-model.trim="user.email" />

                  <input type="password" class="block w-full p-3 mb-4 border rounded border-grey-light" name="password"
                     placeholder="Password" v-model.trim="user.password" />


                  <button class="w-full px-4 py-2 text-white bg-blue-500 border-2 hover:bg-indigo-400 rounded-xl"
                     type="submit">SIGN UP</button>
               </form>

            </div>

            <div class="mt-6 text-grey-dark">
               Already have an account?
               <a class="no-underline border-b border-blue text-blue" href="../login/">
                  <span class="text-red-700">Log in</span>
               </a>.
            </div>



         </div>

      </div>

   </div>
</template>

<script setup>


import {ref,reactive,onMounted} from 'vue'
import axios from 'axios'

const user=reactive ({
   fullName:'',
   email:'',
   password:'',
   role: 'USER'
  
})

const registration= async ()=>{
   axios.post("http://localhost:5173/api/auth/registration", user, {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
   })
   .then(response => {
      window.localStorage.setItem('token', response.data.token);
      window.location.href = "/login";
   })
   .catch(error => {    
      if(error.response.data.statusCode == 400) {
         alert(error.response.data.message);
      }  
      console.error("There was an error!", error);
    });
}


</script>


