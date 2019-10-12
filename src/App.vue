<template>
  <div id="id">
    <v-app>
    <!-- <div id="app"> -->
      <v-app-bar app>        
        <v-toolbar-title class="headline text-uppercase">
          <v-flex class="d-flex" style="align-items:center">
          <span class="pr-2">
            <v-img :src="require('./assets/logo.png')" alt="" width='25' height='25'></v-img>
          </span>
          <span>SIMPLE LIBRARY</span>
          </v-flex>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          text
          href="#/"
        >
          <span class="mr-2">HOME</span>
        </v-btn>
        <v-btn
          text
          href="#/category"
        >
          <span class="mr-2">CATEGORY</span>
        </v-btn>
        <v-btn
          text
          href="#/bookshelf"
        >
          <span class="mr-2">BOOKSHELF</span>
        </v-btn>
        <v-btn
          text
          href="#/books"
        >
          <span class="mr-2">BOOKS</span>
        </v-btn>
        <v-btn
          text
          href="#/transaction"
        >
          <span class="mr-2">TRANSACTION</span>
        </v-btn>
        <v-btn
          text
          href="#/guestbook"
        >
          <span class="mr-2">GUEST BOOK</span>
        </v-btn>
      </v-app-bar>

      <v-content class="mt-6">
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'App',  
}
</script>
