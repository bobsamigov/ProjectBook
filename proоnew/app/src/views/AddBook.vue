<template>
  <form @submit.prevent="addBook" method="post" class="w-1/3 mx-auto my-16 border-2 border-gray-300 outline-gray-700">
    <div class="p-5">
      <div class="flex items-center justify-between my-5">
        <h1 class="font-serif text-lg ">ADD BOOK</h1>

      </div>
      <div class="flex space-x-4 font-serif ">
        <input type="text" placeholder="Name Book" class="w-1/2 p-2 text-gray-600 border-2" v-model="book.title">
        <input type="text" placeholder="Category" class="w-1/2 p-2 border-2">
      </div>
      <div class="flex my-5 space-x-4">
        <input type="text" placeholder="Author" class="w-1/2 p-2 border-2" v-model="book.author">
        <input type="text" placeholder="Year" class="w-1/2 p-2 border-2" v-model="book.year">
      </div>
      <div class="flex mb-5 space-x-4">
        <input type="text" placeholder="url- image" class="w-1/2 p-2 border-2" v-model="book.cover">
        <input type="text" placeholder="url-book" class="w-1/2 p-2 border-2" v-model="book.link">
      </div>
      <textarea name="" id="" cols="10" rows="5" class="w-full p-2 font-serif border-2" placeholder="Description"
        v-model="book.description"></textarea>

      <div class="flex justify-end mt-5 ">
        <button class="px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 ">
          <router-link to="/">CANCEL</router-link>
        </button>
        <button type="submit" class="px-4 py-2 ml-3 font-bold text-white bg-gray-500 hover:bg-gray-700">SAVE</button>
      </div>
    </div>
  </form>



</template>




<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios';

const books = ref([])


const book = reactive({
categoryId: 0,
title: "",
description: "",
author: "",
year: 0,
cover: "",
link: ""
})


const addBook = () => {
console.log(book.title, book.year);
axios.post("http://localhost:5173/api/books", book, {
headers: {
'Access-Control-Allow-Origin': '*',
'Content-Type': 'application/json',
'Accept': 'application/json',
'Authorization': "Bearer " + localStorage.getItem('token')
},
})
.then(response => {
alert("Kitob qowildi")
window.location.href = "/";

})
.catch(error => {
if (error.response.data.statusCode == 400) {
alert(error.response.data.message);
}
console.error("There was an error!", error);
});
}



</script>