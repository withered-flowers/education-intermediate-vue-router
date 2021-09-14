<template>
  <div class="todo">
    <nav>
      <router-link to="/todo/list">List</router-link> |
      <router-link to="/todo/add">Add</router-link>
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
