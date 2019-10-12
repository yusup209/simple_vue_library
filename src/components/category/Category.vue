<template>
  <v-app>
    <v-container>
      <h1 class="display-1">Category</h1>
      <p>ini adalah halaman kategori buku</p>
      <br />
      <br />

      <!-- untuk tabel -->
      <v-card :elevation="5" class="pa-3">
        <!-- <v-btn color="green darken-2 white--text" class="">add category</v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="green darken-2 white--text" dark v-on="on">add category</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Book Category</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model="category.name" label="Category Name"></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1 white--text" text @click="addBookCategory()">Save</v-btn>
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
                  <td>name</td>
                  <td>actions</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(el, idx) in categories" :key="el.id">
                  <td>{{ (idx+1) }}</td>
                  <td>{{ el.name }}</td>
                  <td>
                    <v-dialog v-model="dialog2" persistent max-width="600px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="warning" class="mr-3" dark v-on="on" @click="getCategoryById(el.id)">edit</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Book Category</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-text-field v-model="category_edit.name" label="Category Name"></v-text-field>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <div class="flex-grow-1"></div>
                          <v-btn color="blue darken-1" text @click="dialog2 = false">Close</v-btn>
                          <v-btn
                            color="blue darken-1 white--text"
                            text
                            @click="updateBookCategory()"
                          >Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-btn color="red darken-2 white--text" @click="deleteBookCategory(category.id)">
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
</template>

<script>
import axios from "axios";
import APIService from "../../service/APIService";

const apiService = new APIService();

export default {
  name: "Category",
  data() {
    return {
      dialog: false,
      dialog2: false,
      categories: [],
      category: {},
      category_edit: [],
    }
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      apiService.getData("category").then(data => {
        this.categories = data.category;
      });
    },
    getCategoryById(id) {
      this.dialog2 = true;
      apiService.getDataById("category", id).then(data => {
        this.category_edit = data.category[0];
      });
    },
    addBookCategory() {
      apiService.postData("category", this.category).then(data => {
        this.dialog = false;
        // this.$router().replace({name: 'Category'})
        this.getCategory();
      });
    },
    updateBookCategory() {
      apiService.putData("category", this.category_edit).then(data => {
        this.dialog2 = false;
        this.getCategory();
      });
    },
    deleteBookCategory(id) {
      apiService.deleteData("category", id).then(data => {
        this.getCategory();
      });
    }
  }
};
</script>