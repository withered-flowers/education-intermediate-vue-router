1. Intro
1. What is Vue Router
1. How to Vue Router
    - Basic Vue Router
    - Named Routes
    - Nested Routes
    - Dynamic Routes
    - Programmatic Routes
1. History Mode
1. Navigation Guard
1. References

### Intro
Pada saat kita membuat aplikasi berbasis SPA, seringkali kita menemukan suatu  
hal yang membuat hidup kita menjadi lebih sulit: Navigasi.

Bayangkan dalam sebuah aplikasi SPA, ternyata kita memiliki halaman `Login`,  
halaman `Listing Konten`, halaman `Edit Konten`, dan halaman `Tambah Konten`.  

Apabila kita menggunakan SPA secara tradisional, maka pada saat masuk ke dalam  
aplikasi yang dibuat, kita harus menavigasi satu per satu dari halaman yang  
sudah disediakan oleh aplikasi tersebut, tanpa bisa lompat lompat navigasi.

Contoh:  
- Kita masuk ke dalam aplikasi, kita akan melihat halaman `Login`
- Setelah halaman Login, ternyata kita ingin langsung pindah ke halaman   
  `Tambah Konten`, namun tidak bisa, karena halaman pertama kita adalah  
  `Listing Konten`.
- Apabila kita mengetahui halaman `Tambah Konten` dalam konsep MPA adalah   
  bernama `add`, maka kita bisa saja langsung mengakses halaman tersebut  
  dengan `<domain>/add`
- Dalam konsep aplikasi SPA yang sudah kita pelajari tentu hal ini belum bisa  
  kita lakukan bukan?

Nah sekarang, bagaimana kah kita membuat "penamaan" navigasi atau `routing`  
dalam aplikasi SPA yang sudah kita buat?

TL;DR  
Bagaimanakah kita menambahkan endpoint di dalam aplikasi berbasis SPA?

## What is Vue Router
Dalam VueJS ini, kita bisa menambahkan endpoint di dalam aplikasi berbasis SPA  
dengan menggunakan salah satu package tambahan (library) dari VueJS  
secara official dengan nama extension adalah `Vue Router`.

Dikutip dari https://router.vuejs.org/, kita bisa melihat bahwa `Vue Router`  
adalah sebuah official routing (navigasi) yang disediakan khusus untuk VueJS.

`Vue Router` ini dikatakan memiliki fitur sbb:
- Pemetaan terhadap routing sampai dengan beberapa level (*nested route/views*)
- Konfigurasi router yang modular
- Route params, query, dan bisa menggunakan **wildcard**
- Efek transisi antar router
- Kontrol navigasi yang terkontrol
- Penggunaan *link* dengan class css *active* yang otomatis
- HTML5 History Mode ataupun Hash Mode
- Kustomisasi perlakuan scroll

## How to Vue Router
Mari kita langsung membuat saja yah aplikasinya, sebenarnya sudah sambil 
didemokan juga di atas bukan?

Langkah Pertama - Inisialisasi Project
1. vue create <nama-project>
    - Pick a preset: `Manually select features`
    - Check the Features: 
        - `Choose Vue Version`
        - `Babel`
        - `Router`
        - `Linter / Formatter`
    - Choose a version of Vue.js: `2.x`
    - Use history mode for router? `Y`
    - Pick a liter / formatter config: `ESLint with error prevention only`
    - Pick additional lint features: `Lint on save`
    - Where do you prefer placing config? `In dedicated config files`
    - Save this as a preset for future projects? `N`
1. Menunggu project ini dibuat...
1. Setelah project telah berhasil dibuat, selanjutnya kita akan masuk ke dalam  
   project dengan menggunakan perintah `cd <nama-project>`
1. Setelah itu kita akan menjalankan aplikasi dengan perintah `npm run serve`

Maka secara otomatis, kita sudah akan dibuatkan kerangka project untuk Vue.js  
yang sudah menggunakan `Vue Router` di dalamnya.

Selanjutnya kita akan melihat dan mempelajari bagaiamana route ini dibuat dan  
digunakan !

### Basic Vue Router
Pertama-tama kita akan melihat terlihat dahulu file `/src/router/index.js`.

File ini berisi struktur routing yang sudah dibuat.

File ini kemudian akan digunakan dalam `/src/main.js`, dimana akan diimport  
kemudian akan di-`selip`-kan ke dalam instance Vue itu sendiri, mirip seperti  
konsep `middleware` pada express, namun pada Vue.js, disebutnya adalah `plugin`.

Selanjutnya kita akan membahas tentang penggunaan dari Vue Router itu sendiri.

Mari kita buka kembali file `/src/router/index.js` dan melihat kode yang   
telah dibuat dengan lebih mendalam.

Pada file ini kita dapat mengetahui terdapat 2 buah routing yang sudah dibuat:
- Route `/` (root) dengan nama `Home` yang mengacu pada Component `Home`
- Router `/about` dengan nama `About` yang mengacu pada Component `About.vue`  
  yang akan di-*lazy-load*-kan.

Perbedaan antara component yang *lazy-load* dengan yang tidak *lazy-load*  
adalah component lazy-load tidak akan di-load secara langsung (tidak diberikan  
kepada user secara langsung).

Hal ini dapat dilihat pada Inspect Network yang terdapat di dalam browser kita.

Ketika user menekan tombol `About` di aplikasi, akan meminta sebuah data   
tambahan bernama `about.js`, sehingga dapat disimpulkan bahwa halaman `about`  
itu di-unduhnya belakangan (*lazy-load*).

Selanjutnya kita akan melihat penggunaannya pada file `/src/App.vue`

Pada file `App.vue` ini, terlihat cara menggunakan Vue Router ini menjadi 2  
komponen:
- `<router-link>` yang akan menampilkan tombol navigasi yang kita inginkan,  
  Anggap saja seperti tag `<a>` tapi khusus untuk Vue Router.
- `<router-view>` yang akan menampilkan halaman yang kita inginkan, Anggap   
  saja seperti sebuah Component Vue yang `bunglon`, yang bisa berubah menjadi  
  Component Vue lainnya, tergantung router mana yang sedang aktif.

Selanjutnya kita akan melihat bagaimana cara menggunakan Vue Router itu sendiri.

Pada file `/src/App.vue`, kita akan melihat 2 `router-link` yang akan  
mengarah ke `/` dan `/about`, kode tersebut adalah sebagai berikut:

```html
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
```

Bayangkan apabila nantinya routing kita sudah banyak, dan ber-lapis-lapis.

Misalnya: `/a/b/c/d/e/f/blablabla`. 

Bagaimanakah cara kita menuliskannya? 

Apakah masih akan kita tulis `to="/a/b/c/d/e/f/blablabla"`?   
Tentu saja tidak bukan? Lalu bagaimanakah salah satu solusinya?

Nah pada bagian selanjutnya kita akan mencoba untuk menggunakan `Named Routes`  
untuk menyelesaikan permasalahan ini yah !

### Named Routes
Sesuai dengan namanya, `Named Routes`, adalah routing yang diberikan nama atau  
diberikan `alias` sehingga lebih mudah dalam pengingatan nama rute dan cara  
memanggilnya.

Misalnya kita akan buka kembali file `/src/router/index.js` dan melihat  
route yang sudah ada

```javascript
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
```

Dari file ini, terlihat bahwa ada 2 route yang sudah diberikan nama:
- route `/` dengan nama `Home`
- route `/about` dengan nama `About`

Sekarang kita akan mencoba untuk mengubah kode pada `App.vue` sehingga bisa  
menggunakan route yang sudah diberikan nama tersebut.

pada file `App.vue`, kita hanya perlu mengubah route dalam bentuk `Object`,   
dan passing prop dengan nama `name` yang berisi nama route yang sudah   
diberikan.

```html
  <router-link to="{ name: 'Home' }">Home</router-link>
  <router-link to="{ name: 'About' }">About</router-link>
```

Kemudian kita akan coba untuk menjalankan kode ini, kemudian lihatlah  
hasilnya.

Hasilnya adalah `kosong` bukan? 😁

Hasilnya adalah tidak terjadi error, namun pada saat menekan link `Home`,  
akan disajikan halaman kosong !

Bahkan apabila dilihat dari address bar, yang terlihat adalah   
`<alamat>/{ name: 'Home'}`. 

Mengapa demikian?

Nah hal ini terjadi karena kita belum mem-`binding` value dari object 
tersebut, sehingga terbacanya adalah apa adanya.

Mari kita ubah kode lagi untuk memperbaiki hal ini


```html
  <!-- Tambahkan v-bind directive pada to -->
  <router-link v-bind:to="{ name: 'Home' }">Home</router-link>
  <!-- Bila malas, cukup gunakan shorthand ":" -->
  <router-link :to="{ name: 'About' }">About</router-link>
```

Maka kode nya pun akan berjalan seperti semula !

Dan dengan ini pun, apabila kita mengubah route `About` menjadi  
`/about/apa/ajalah/yang/penting/panjang` pun, tinggal ditulis dengan  
`name = 'About'` saja untuk mempersingkatnya.

Mudah bukan?

Nah selanjutnya kita akan belajar lebih lanjut mengenai route berlapis-lapis  
atau dikenal dengan nama `Nested Routes`.

### Nested Routes
Pada pembuatan aplikasi kekinian, tentunya kita akan seringkali menemukan  
sebuah alamat yang berlapis-lapis, misalnya:
- `/todo/add` yang menyatakan halaman untuk menambahkan todo
- `/todo/list` yang menyatakan halaman untuk melihat listing / isian dari todo

Nah, artinya disini sebenarnya adalah kita memiliki sebuah route utama   
bernama `/todo` yang memiliki 2 `anak` route, yaitu `/todo/add` dan  
`/todo/list`.

Bagaimanakah cara kita mendefinisikan route ini apabila sudah menggunakan  
Vue Router?

Mari kita mencoba untuk membuat kedua Component nya terlebih dahulu.

Pertama-tama kita akan mematikan `npm run serve` yang sudah dilakukan  
sebelumnya.

Kemudian kita akan menginstall package bernama `axios` yang akan digunakan  
untuk mengambil data dari internet, dengan perintah   
`npm install axios --save`.

Kemudian, Kita akan membuat dua buah Component pada folder `components`   
dengan nama `TodoList.vue` dan `TodoAdd.vue`.

Pada `TodoList.vue` kita akan membuatnya menjadi sebagai berikut

File: `/src/components/TodoList.vue`
```html
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
          <td></td>
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
```

File: `/src/components/TodoAdd.vue`
```html
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
```

Selanjutnya kita akan membuat sebuah Views dengan nama `Todo.vue`.

Buatlah sebuah file dengan nama `Todo.vue` pada `/views` dan isi dengan kode  
sebagai berikut:

File: `/src/views/Todo.vue`
```html
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
```

Kemudian kita akan menambahkan routing ini seluruhnya pada file   
`/src/router/index.js`

File: `/src/router/index.js`
```javascript
...
// Import seluruh component yang akan digunakan
import Todo from "../views/Todo.vue";
import TodoList from "../components/TodoList.vue";
import TodoAdd from "../components/TodoAdd.vue";

...

const routes = [
  ...
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
    ],
  },
];
```

Selanjutnya kita akan memodifikasi file `App.vue` sehingga dapat menampilkan  
navigasi `Todo`

File: `/src/App.vue`
```html
  ...
  <div id="nav">
    <router-link v-bind:to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link> |
    <!-- Tambahkan route Todo -->
    <router-link :to="{ name: 'Todo' }">Todo</router-link>
  </div>
    ...
```

Kemudian cobalah untuk menjalankan kode yang sudah dimodifikasi ini dan  
lihatlah hasilnya !

Lalu selanjutnya, apabila kita melihat dalam sebuah aplikasi backend yang   
dibuat (mis Express), maka kita biasanya akan menemukan endpoint yang   
memiliki sebuah parameter tersendiri, mis `/todos/:id`.

Nah bagaimanakah cara kita membuatnya pada aplikasi Vue.js dengan Vue Router  
ini?

Untuk itu kita akan mempelajari lebih lanjut tentang Dynamic Routes.

### Dynamic Routes



### Programmatic Routes

## History Mode

## Navigation Guard

## References