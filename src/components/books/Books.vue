<template>
  <div>
    <v-app>
      <v-container>
        <h1 class="display-1">Books</h1>
        <p>ini adalah halaman buku</p>
        <br />
        <br />

        <!-- untuk tabel -->
        <v-card :elevation="5" class="pa-3">
          <!-- <v-btn color="green darken-2 white--text" class="">add book</v-btn> -->

          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="green darken-2 white--text" dark v-on="on">add book</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Book</span>
              </v-card-title>
              <v-card-text>
                <!-- {{ this.categories }} -->
                <v-container>
                  <v-row>
                    <v-text-field type="number" label="ISBN" v-model.number="book.isbn"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field label="Book Title" v-model="book.title"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field label="Author" v-model="book.author"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-autocomplete
                      label="Category"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      v-model="book.category_id"
                    ></v-autocomplete>
                  </v-row>
                  <v-row>
                    <v-autocomplete
                      label="Bookshelf"
                      :items="bookshelves"
                      item-text="bookshelf_code"
                      item-value="id"
                      v-model="book.bookshelf_id"
                    ></v-autocomplete>
                  </v-row>
                  <v-row>
                    <v-text-field label="Publisher" v-model="book.publisher"></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1 white--text" text @click="addBook()">Save</v-btn>
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
                    <th>isbn</th>
                    <th>title</th>
                    <th>author</th>
                    <th>category</th>
                    <th>bookshelf</th>
                    <th>publisher</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(book,idx) in books" :key="book.id">
                    <td>{{ (idx+1) }}</td>
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.category.name}}</td>
                    <td>{{ book.bookshelf.bookshelf_code }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>
                      <!-- <v-btn color="warning" class="mr-3">
                        <span>edit</span>
                      </v-btn>-->
                      <v-dialog v-model="dialog2" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                          <v-btn color="warning" dark @click="getBookByID(book.id)" class="mr-3">edit</v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Edit Book</span>
                          </v-card-title>
                          <v-card-text>
                            <!-- {{ this.categories }} -->
                            <v-container>
                              <v-row>
                                <v-text-field type="number" label="ISBN" v-model.number="book_edit.isbn"></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field label="Book Title" v-model="book_edit.title"></v-text-field>
                              </v-row>
                              <v-row>
                                <v-text-field label="Author" v-model="book_edit.author"></v-text-field>
                              </v-row>
                              <v-row>
                                <v-autocomplete
                                  label="Category"
                                  :items="categories"
                                  item-text="name"
                                  item-value="id"
                                  v-model="book_edit.category_id"
                                ></v-autocomplete>
                              </v-row>
                              <v-row>
                                <v-autocomplete
                                  label="Bookshelf"
                                  :items="bookshelves"
                                  item-text="bookshelf_code"
                                  item-value="id"
                                  v-model="book_edit.bookshelf_id"
                                ></v-autocomplete>
                              </v-row>
                              <v-row>
                                <v-text-field label="Publisher" v-model="book_edit.publisher"></v-text-field>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
                            <v-btn color="blue darken-1 white--text" text @click="updateBook()">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn color="red darken-2 white--text" @click="deleteBook(book.id)">
                        <span>delete</span>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </v-simple-table>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import APIService from "../../service/APIService";

const apiService = new APIService();

export default {
  name: "Books",
  data() {
    return {
      dialog: false,
      dialog2: false,
      books: [],
      book: {},
      book_edit: {},
      categories: [{}],
      bookshelves: [{}]
    };
  },
  created() {
    this.getBooks();
    this.getCategoryAndBookshelf();
  },
  mounted() {},
  methods: {
    getBooks() {
      apiService.getData("book").then(data => {
        this.books = data.book;
      });
    },
    getBookByID(id){
      this.dialog2 = true
      apiService.getDataById("book", id).then(data => {
        this.book_edit = data.book[0]
        console.log(this.book_edit)
      })
    },
    getCategoryAndBookshelf() {
      apiService.getData("category").then(data => {
        this.categories = data.category;
      });
      apiService.getData("bookshelf").then(data => {
        this.bookshelves = data.bookshelf;
      });
    },
    addBook() {
      console.log(this.book);
      apiService.postData("book", this.book).then(data => {
        this.getBooks();
        this.dialog = false;
      });
    },
    updateBook(){
      console.log(this.book_edit)
      apiService.putData("book", this.book_edit).then(data => {
        this.getBooks()
        this.dialog2 = false;
      })
    },
    deleteBook(id) {
      console.log(id);
      apiService.deleteData("book", id).then(data => {
        this.getBooks();
      });
    }
  }
};
</script>