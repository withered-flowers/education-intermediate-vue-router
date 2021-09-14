<template>
  <div class="todo">
    <nav>
      <router-link to="/todo/list">List</router-link> |
      <router-link to="/todo/add">Add</router-link> |
      <!-- 
        Di sini kita akan menggunakan named Routing beserta
        passing parameter todoId yang dibutuhkan
      -->
      <router-link
        :to="{
          name: 'TodoEdit',
          params: {
            todoId: 1,
          },
        }"
        >Edit</router-link
      >
    </nav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
};
</script>

<style></style>
