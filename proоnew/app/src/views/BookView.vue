<template >
  <div class="w-full p-5 pl-10 mb-20 font-serif">
    <h1 class="my-4 text-2xl ">{{book.title}}</h1>

    <div class="flex justify-center mt-5">
      <img :src="book.cover" alt="" class="block w-1/3">
      <div>
        <div class="px-10">

          <h1 class="font-bold "> AUTHOR :</h1>
          <p>{{book.author}}</p>
          <h1 class="font-bold "> YEAR :</h1>
          <p>{{book.year}}</p>
          <h1 class="font-bold "> Created at :</h1>
          <p>{{ book.createdAt }}</p>
        </div>
        <p class="px-10 pt-5 text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit corporis, aliquid
          dicta
          doloribus inventore
          dolore nobis voluptate sapiente dolores fugiat omnis? Impedit, optio dignissimos soluta non provident eos quae
          ipsam vero saepe qui explicabo assumenda ab facilis dolore? Impedit minus labore aspernatur atque, quis
          voluptatem soluta! Nobis fugit quis quaerat expedita temporibus itaque ea. Velit, nemo quia voluptatem tempore
          recusandae magnam autem vero impedit, perferendis repudiandae ad dolorum doloremque quibusdam placeat quae
          optio nulla possimus, porro fugiat. Architecto cumque sint, animi quibusdam magni necessitatibus, sed autem id
          sit quasi at quos est totam iste et neque, provident harum repellendus cum facilis! Quos inventore officiis
          laudantium sequi, odit at non assumenda enim. Earum ex quos voluptatibus voluptas tempore, consequatur
          laborum.
          Eaque, laborum. Inventore nihil molestias aliquid sit provident ex doloribus quaerat eos aspernatur nulla
          illum
          excepturi minus, sint dolorum incidunt iure rerum rem impedit iste ratione ullam ad illo vitae. Harum
          architecto ab impedit eveniet qui tempore possimus eaque magni laboriosam sed dolor sunt dolores voluptatibus
          facere quod incidunt voluptatem repellat placeat, facilis dolorum. Facere dolorum deserunt doloremque beatae
          dolores provident sapiente. Maiores quis, minus at necessitatibus assumenda dolores illo aliquid libero earum
          nulla sint, mollitia architecto deleniti cumque soluta magni!</p>
      </div>
    </div>
    <div class="flex-col w-full mt-16 ">

      <a href="https://gallery.mailchimp.com/8e752e4bbd262c334baf13009/files/1._100_ways_to_motivate_yourself.pdf"
        class="flex items-center justify-center w-1/3 py-1 mb-8 space-x-3 font-bold text-white bg-blue-500 hover:bg-blue-700">
        <div @click="download">Download as </div>
        <div>
          <img src="../assets/icon-down.png" width="40" alt="">
        </div>
      </a>


      <button
        class="flex items-center justify-center w-1/3 px-2 py-1 space-x-3 font-bold text-white bg-blue-500 hover:bg-blue-700">
        <div>Add Favourite</div>
        <div>
          <img src="../assets/fav-icon.png" width="40" alt="">
        </div>
      </button>

    </div>
  </div>
</template>


<script setup>

import { ref, reactive, onMounted } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';



const book = ref([]);


const loadBook = async (book_id) => {
  let params = {};


  axios.get("http://localhost:5173/api/books/" + book_id, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
    .then(response => {
      console.log("Book detail: ", response);
      book.value = response.data;
    })
    .catch(error => {
      if (error.response.data.statusCode == 400) {
        alert(error.response.data.message);
      }
      console.error("There was an error!", error);
    });
}

onMounted(() => {
  const route = useRoute();
  let book_id = route.params.book_id;
  loadBook(book_id)
})



</script>
