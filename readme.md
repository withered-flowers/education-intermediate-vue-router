1. Intro
1. What is Vue Router
1. How to Vue Router
    - Basic Vue Router
    - Named Routes
    - Nested Routes
    - Dynamic Routes
    - Programmatic Navigation
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

Untuk itu kita akan mempelajari lebih lanjut tentang `Dynamic Routes`.

### Dynamic Routes
Misalkan pada aplikasi yang kita buat ini, kita ingin menambahkan sebuah rute  
baru pada todo, misalnya adalah menambahakan rute `/todo/edit`.

Yang jadi permasalahan adalah edit ini akan bergantung dari id todo yang akan  
dipilih, sehingga kita membutuhkan suatu *parameter* tambahan atau variabel  
tambahan yang akan dijadikan penanda id todo yang akan di edit.

Sehingga pada tahap ini kita akan membutuhkan suatu kedinamisan parameter 
dalam router kita.

Cara untuk menambahkan kedinamisan ini adalah dengan cara kita akan   
menambahkan `Dynamic Routes` pada router kita.

Misalnya kita ingin menambahkan rute `/todo/edit/:todoId` pada router,  
maka kita akan membuka file `/src/router/index.js` dan menambahkan sebagai   
berikut:

```javascript
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
      {
        // definisikan path untuk ke /todo/edit/:todoId
        path: "edit/:todoId",
        name: "TodoEdit",
        component: "", // Component dikosongkan dulu, untuk diisi nanti
      },
    ],
  },
  ...
```

Kemudian setelah ini kita akan mempersiapkan Component-nya untuk menampilkan  
parameter :todoId.

Buatlah sebuah Component baru dengan nama `TodoEdit.vue`  
kemudian isilah dengan kode sebagai berikut:

File: `/src/components/TodoEdit.vue`
```html
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
```

Kemudian kita sekarang akan melengkapi router kita dengan menambahkan  
Component `TodoEdit` yang baru saja kita buat ini.

File: `/src/router/index.js`
```javascript
...
import TodoEdit from "../components/TodoEdit.vue";

...
  {
    // definisikan path untuk ke /todo/edit/:todoId
    path: "edit/:todoId",
    name: "TodoEdit",
    // masukkan Component TodoEdit yang sudah kita import
    component: TodoEdit,
  },
```

Sekarang kita akan menggunakan router yang didefinisikan dengan `router-link`  
terlebih dahulu yah (sehingga parameter yang digunakan "statik")

Nanti akan kita lihat lebih lanjut bagaimana untuk menggunakan / passing  
parameter ini sangat dinamis dengan cara programmatic navigation 😉.

File: `/src/views/Todo.vue`
```html
  ...

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
  ...
```

Kemudian setelah ini kita jalankan aplikasi yang sudah dibuat ini dan  
lihatlah outputnya seperti apa !

Cukup menakjubkan bukan? 😉

Namun cara yang kita gunakan sekarang ini masih kurang efisien bukan?

Sebagai contoh, apabila kita ingin pada Component `TodoList` kita ingin  
menambahkan sebuah tombol untuk meng-edit data berdasarkan id todo yang ada  
pada baris tersebut, kemudian sambil kita akan melakukan sesuatu seperti  
mencetak id tersebut ke console log.

Bagaimanakah cara kita melakukannya kalau kita hanya menggunakan `router-link`  
saja?

Tentunya tidak bisa bukan?

Diperlukan suatu cara lain yang dinamakan dengan `Programmatic Navigation`.

### Programmatic Navigation
Misalkan sekarang ini kita memerlukan sebuah tombol `Edit` pada Component  
`TodoList.vue`.

Tombol ini nantinya akan menampilkan data satu baris dari Object todo yang ada  
dalam console log, serta akan berpindah ke route `/todo/edit/:todoId`.

Untuk bisa melakukan hal ini, maka kita akan membutuhkan pembuatan navigasi   
secara programatik.

Dan dalam Vue Router, hal ini juga sudah disediakan sehingga kita bisa  
melakukannya dengan cara `this.$route.push`

Mari kita coba melakukannya !

Bukalah kembali Component `TodoList.vue` dan kita akan menambahkan sebuah   
button `Edit` di dalam `TodoList.vue` dan menggunakan programmatic navigation  
untuk bisa berpindah ke route `/todo/edit/:todoId`.

File: `/src/components/TodoList.vue`
```html
<template>
  ...
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>{{ todo.isCompleted }}</td>
          <!-- Tambahkan action edit di sini -->
          <td>
            <!-- 
              Di sini kita akan menambahkan sebuah method
              yang akan menghandle ketika button edit diclick
              dan akan mengirimkan parameter object Todo yang
              ada pada baris tersebut
             -->
            <button @click="editHandler(todo)">Edit</button>
          </td>
        </tr>
      </tbody>
  ...
</template>

...
<script>
  ...
  methods: {
    ...,
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
  }
</script>
```

Sehingga dari sini kita sudah bisa menggunakan programmatic navigation dengan  
baik.

Selain penggunaan `$router.push` ada juga beberapa method lainnya yang bisa  
digunakan yaitu:
- `$router.replace`
- `$router.go`
- `$router.back`

(Untuk pembelajaran kali ini tidak dibahas detil yah, coba dicari lebih lanjut  
pada dokumentasi official vue router yang tersedia)

## History Mode
Mode default dari vue-router sebenarnya adalah dalam bentuk `hash mode`,  
dimana menggunakan hash dari url untuk mensimulasikan URL yang ada, sehingga  
page tidak akan pernah di-reload ketika urlnya berubah.

Hanya saja pada pembelajaran ini, kita telah menggunakan mode kedua yang  
bernama `History Mode`.

Hal ini dapat dilihat pada file `/src/router/index.js`

File: `/src/router/index.js`
```javascript
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
```

Di sini kita mendefinisikan mode `history` sehingga kita bisa menggunakan  
history mode.

Namun History Mode ini memiliki kelemahan:   
```markdown
Harus menambahkan konfigurasi tambahan pada server dimana Vue.js nya  
dihosting
```

Sebagai contoh pada hosting firebase, kita akan diminta untuk menambahkan  
konfigurasi `rewrites` pada `firebase.json`.

```json
  "rewrites": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
```

Untuk server lainnya, harus menggunakan konfigurasi lainnya yah !

Masuk ke bagian terakhir dari pembelajaran Vue Router kita, yaitu  
`Navigation Guard`.

## Navigation Guard
Disclaimer:  
Navigation Guard ini tidak didemokan dalam pembelajaran ini !

Navigation Guard, sesuai dengan namanya, adalah suatu teknik yang disediakan  
oleh Vue Router untuk melindungi navigasi atau endpoint yang ada, dengan cara  
melakukan redirect ataupun melakukan cancel navigasi berdasarkan logic tertentu.

Dalam Navigation Guard ini sendiri ada suatu aturan yang dipegang teguh:
- Perubahan konten dari route `params` ataupun `query` **TIDAK** akan  
  mentrigger navigation guard

Cara untuk menggunakan Navigation Guard adalah dengan cara menambahkan method  
yang digunakan untuk melindungi navigasi pada `/src/router/index.js`.

File: `/src/router/index.js`
```javascript
const router = new VueRouter({ ... });

// Method ini adalah navigation guard yang akan dijalankan
// sebelum semua route dijalankan / sebelum masuk ke route yang ada
router.beforeEach((to, from, next) => {
  // to = route yang akan dituju (Route)
  // from = route yang sedang dituju (Route)

  // Baik to / from bisa mengambil data Route yang ada
  // mis: to.name / from.name 

  // next = method untuk mengirimkan navigasi ke route yang dituju (Function)
  // - next() = mengirimkan navigasi ke route yang dituju
  // - next(false) = mengirimkan navigasi ke route yang sebelumnya
  // - next(route) = mengirimkan navigasi ke route yang dituju
  //    - route = object Route yang akan dituju
  // - next(error) = mengirimkan navigasi ke route yang error

  // Pastikan next hanya akan dipanggil SATU KALI saja dalam logic yang ada !
});
```

Selain `beforeEach` ada juga method lainnya seperti:
- `afterEach`
- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

Dan lain lainnya, karena router navigation ini juga memiliki lifecyclenya  
sendiri.

Untuk detil lifecycle dari router navigation, kita bisa lihat pada  
https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow

Sampai pada tahap ini kita sudah mempelajari Vue Router dengan lebih mendalam !

Selamat mencoba dan selamat mengembangkan aplikasi !

## References
- https://router.vuejs.org/guide/essentials/named-routes.html
- https://router.vuejs.org/guide/essentials/dynamic-matching.html
- https://router.vuejs.org/guide/essentials/nested-routes.html
- https://router.vuejs.org/guide/essentials/navigation.html
- https://router.vuejs.org/guide/essentials/history-mode.html
- https://router.vuejs.org/guide/advanced/navigation-guards.html
- https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow