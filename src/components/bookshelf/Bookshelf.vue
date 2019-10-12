<template>
  <v-app>
    <v-container>
      <div>
        <h1 class="display-1">Bookshelf</h1>
        <p>ini adalah halaman rak buku</p>
        <br />
        <br />

        <!-- untuk tabel -->
        <v-card :elevation="5" class="pa-3">
          <!-- <v-btn color="green darken-2 white--text" class>add bookshelf</v-btn> -->

          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="green darken-2 white--text" dark v-on="on">add bookshelf</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Bookshelf</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field v-model="bookshelf.bookshelf_code" label="Bookshelf code"></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1 white--text" text @click="addBookshelf()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <br />
          <v-simple-table class="my-3">
            <template v-slot:default>
              <table>
                <thead>
                  <tr>
                    <td>id</td>
                    <td>code</td>
                    <td>actions</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bookshelf, idx) in bookshelves" :key="bookshelf.id">
                    <td>{{ (idx+1) }}</td>
                    <td>{{ bookshelf.bookshelf_code }}</td>
                    <td>
                      <v-dialog v-model="dialog2" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                          <v-btn
                            color="warning"
                            class="mr-3"
                            dark
                            v-on="on"
                            @click="getBookshelfById(bookshelf.id)"
                          >edit</v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Edit Bookshelf</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-text-field v-model="bookshelf_edit.bookshelf_code" label="Bookshelf code"></v-text-field>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
                            <v-btn
                              color="blue darken-1 white--text"
                              text
                              @click="updateBookshelf()"
                            >Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn
                        color="red darken-2 white--text"
                        @click="deleteBookshelf(bookshelf.id)"
                      >
                        <span>delete</span>
                      </v-btn>
                    </td>
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
  name: "Bookshelf",
  data() {
    return {
      dialog: false,
      bookshelves: [],
      bookshelf: {},
      bookshelf_edit: {},
      dialog2: false,
    };
  },
  created() {
    this.getBookshelf();
  },
  methods: {
    getBookshelf() {
      apiService.getData("bookshelf").then(data => {
        this.bookshelves = data.bookshelf;
      });
    },
    getBookshelfById(id) {
      this.dialog2 = true;
      apiService.getDataById("bookshelf", id).then(data => {
        this.bookshelf_edit = data.bookshelf[0]
        console.log(this.bookshelf_edit)
      });
    },
    addBookshelf() {
      this.dialog = false;
      apiService.postData("bookshelf", this.bookshelf).then(data => {
        this.getBookshelf();
      });
    },
    updateBookshelf() {
      apiService.putData("bookshelf", this.bookshelf_edit).then(data => {
        this.dialog2 = false;
        this.getBookshelf();
      });
    },
    deleteBookshelf(id) {
      apiService.deleteData("bookshelf", id).then(data => {
        this.getBookshelf();
      });
    }
  }
};
</script>