import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";

// Import seluruh component yang akan digunakan
import Todo from "../views/Todo.vue";
import TodoList from "../components/TodoList.vue";
import TodoAdd from "../components/TodoAdd.vue";
import TodoEdit from "../components/TodoEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // component: About,
  },
  {
    // definisikan path untuk ke /todo
    path: "/todo",
    name: "Todo",
    component: Todo,

    // todo ini memiliki nested (child) component
    // didefinisikan dalam props children
    children: [
      {
        // definisikan path untuk ke /todo/list
        path: "list",
        name: "TodoList",
        component: TodoList,
      },
      {
        // definisikan path untuk ke /todo/add
        path: "add",
        name: "TodoAdd",
        component: TodoAdd,
      },
      {
        // definisikan path untuk ke /todo/edit/:todoId
        path: "edit/:todoId",
        name: "TodoEdit",
        // masukkan Component TodoEdit yang sudah kita import
        component: TodoEdit,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
