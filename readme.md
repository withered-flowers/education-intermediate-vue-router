1. Intro
1. What is Vue Router
1. How to Vue Router
    - Basic Vue Router
    - Named Routes
    - Nested Routes
    - Dynamic Routes
    - Programmatic Routes
    - History Mode
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

### Nested Routes

### Dynamic Routes

### Programmatic Routes

### History Mode

## Navigation Guard

## References