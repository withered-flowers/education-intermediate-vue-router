<template>
  <div class="todo-edit">
    Ini adalah isi dari parameter yang dikirim dari router:
    <!-- 
      perhatikan di sini kita menggunakan:
        - $route yang merupakan alias untuk mengarah ke data yang ada 
          pada router 
        - $route.params <-- merupakan "parameter" yang ditarik dari
          router
        - $route.params.todoId <--- karena kita menggunakan dynamic route
          dengan parameter tambahan berupa todoId dan kita ingin menggunakan  
          parameter tersebut
    -->
    {{ $route.params.todoId }}
  </div>
</template>

<script>
export default {
  name: "TodoEdit",
};
</script>

<style>
.todo-edit {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
