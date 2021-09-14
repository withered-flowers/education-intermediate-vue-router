<template>
  <div class="todo-add">
    <form action="#">
      <div>
        <input type="text" v-model="todo.name" placeholder="Nama Todo?" />
      </div>
      <div>
        <button type="submit">Tambah</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "TodoAdd",
  data() {
    return {
      todo: {
        name: "",
      },
    };
  },
};
</script>

<style>
form > div {
  display: inline-block;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
</style>
