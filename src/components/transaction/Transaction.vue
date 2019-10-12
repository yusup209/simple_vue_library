<template>
  <v-app>
    <v-container>
      <div>
        <h1 class="display-1">Transaction</h1>
        <p>ini adalah halaman transaksi buku (pinjam/kembali)</p>
        <br />
        <br />

        <!-- untuk tabel -->
        <v-card :elevation="5" class="pa-3">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="green darken-2 white--text" dark v-on="on">add transaction</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Book Transaction</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field v-model="book_transaction.name" label="Name"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field type="number" v-model.number="book_transaction.nis" label="NIS"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-autocomplete
                      label="Book"
                      :items="books"
                      item-text="title"
                      item-value="id"
                      v-model="book_transaction.book_id"
                    ></v-autocomplete>
                  </v-row>
                  <v-row>
                    <v-autocomplete label="Status" :items="status" v-model="book_transaction.status"></v-autocomplete>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1 white--text" text @click="addBookTransaction()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <br />
          <v-simple-table class="my-3">
            <template v-slot:default>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>nis</th>
                    <th>book</th>
                    <th>status</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(trx,idx) in transactions" :key="trx.id">
                    <td>{{ (idx+1) }}</td>
                    <td>{{ trx.Name }}</td>
                    <td>{{ trx.NIS }}</td>
                    <td>{{ trx.book.title }}</td>
                    <td><v-chip color="green" text-color="white">{{ trx.Status }}</v-chip></td>
                    <td><v-btn color="primary white--text" @click="returnBook(trx.id)">kembalikan</v-btn></td>
                  </tr>
                </tbody>
              </table>
            </template>
          </v-simple-table>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import APIService from "../../service/APIService";

const apiService = new APIService();

export default {
  name: "Transaction",
  data() {
    return {
      transactions: [],
      book_transaction: {},
      books: [],
      book: {},
      dialog: false,
      status: ["Dipinjam"]
    };
  },
  created() {
    this.getTransaction();
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getTransaction() {
      apiService.getData("transaction").then(data => {
        this.transactions = data.book_transaction;
        console.log(this.transactions[0]);
      });
    },
    getBooks() {
      apiService.getData("book").then(data => {
        this.books = data.book;
      });
    },
    addBookTransaction() {
      apiService.postData("transaction", this.book_transaction).then(data => {
        this.dialog = false
        this.getTransaction()
      })
    },
    returnBook(id){
      apiService.returnBook("transaction", id).then(data => {
        this.getTransaction()
      })
    }
  }
};
</script>