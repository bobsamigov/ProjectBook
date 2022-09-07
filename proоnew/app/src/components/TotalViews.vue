<template>
  <div class="flex justify-center w-full mb-40">
    <div class="w-full">

      <div class="flex justify-center w-full p-12 mx-auto font-serif ">

        <div class="flex w-auto space-x-14">
          <div class="px-4 py-2 bg-white border-2 border-gray-300" v-for="book in books.content">
            <router-link :to="{ name: 'book_view', params: { book_id: book.id } }">{{ book.title }}


              <img :src="book.cover" class="" width="200">
            </router-link>
            <div class="px-4 text-center">
              <h3 class="py-2 font-serif font-bold">{{ book.title }}</h3>
              <div class="text-center">
                <p>Author: {{ book.author }}</p>
                <p>Year: {{ book.year }}</p>

              </div>
            </div>
            <button @click="deleteBook(book.id)" v-if="auth_user_role == 'ADMIN'"
              class="w-full px-4 py-2 text-white bg-red-500 border-2 hover:bg-indigo-400 rounded-xl">Delete
            </button>
          </div>
        </div>
      </div>
      <div>

        <Pagination />
      </div>


    </div>


  </div>


</template>

<script setup>
import Pagination from '../components/Pagination.vue'
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios';

const books = ref([]);
const bookDetail = ref([]);

const loadBooks =  () => {
  let params = {};

  axios.get("http://localhost:5173/api/books", params, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': window.localStorage.getItem('token')
    },
  })
    .then(response => {
      console.log(response);
      books.value = response.data;
    })
    .catch(error => {
      if (error.response.data.statusCode == 400) {
        alert(error.response.data.message);
      }
      console.error("There was an error!", error);
    });
}



onMounted(() => {
  loadBooks()
})

const deleteBook=(book_id)=>{
  try{
if(window.confirm("Haqiqatda ochirmoqchimisiz?")){
    axios.delete("http://localhost:5173/api/books/" + book_id, {
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('token')
},
}).then(() => {
alert("kitob o'chirildi")
loadBooks()
})
}
  
  }catch (error) {
    console.log(error);
  }
}

let auth_user_role = ref(0);
auth_user_role = window.localStorage.getItem('auth_user_role')
console.log(auth_user_role);
</script>