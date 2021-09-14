<template>
  <div class="todo-list">
    <table>
      <thead>
        <tr>
          <th>Todo ID</th>
          <th>Todo Name</th>
          <th>Todo Completed</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>{{ todo.isCompleted }}</td>
          <!-- Tambahkan action edit di sini -->
          <td>
            <button @click="editHandler(todo)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Pada pembelajaran ini kita menggunakan axios
import axios from "axios";

export default {
  name: "TodoList",
  data() {
    return {
      // data awal untuk diisi todos
      todos: [],
    };
  },
  methods: {
    // method untuk mengambil data todos
    async getTodos() {
      try {
        // mendapatkan data todos
        const response = await axios({
          method: "GET",
          url: "https://613fdd1c5cb9280017a1107e.mockapi.io/v1/todos",
        });

        const dataTodos = response.data;

        // mengisi data todos
        this.todos = dataTodos;
        // console.log(this.todos);
      } catch (err) {
        // hanya untuk pembelajaran
        // tampilkan error di console log
        console.log(err);
      }
    },
    editHandler(todo) {
      // mencetak isi dari todo ke dalam console.log
      console.log(todo);

      // pindah ke route /todo/edit/:todoId
      // di sini kita menggunakan cara object untuk berpindah ke route
      // lainnya
      this.$router.push({
        name: "TodoEdit",
        // di sini kita akan mempassing parameter todoId
        params: {
          todoId: todo.id,
        },
        // di sini kita akan iseng untuk mencoba menggunakan
        // query sehingga kita akan menambahkan query string ke url
        // ?name=<nama_dari_todo>
        query: {
          // query untuk mengirimkan data ke route TodoEdit
          name: todo.name,
        },
      });
    },
  },
  async created() {
    // panggil method getTodos
    await this.getTodos();
  },
};
</script>

<style>
.todo-list {
  width: 100%;
}

.todo-list > table {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
