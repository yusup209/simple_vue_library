<template>
  <v-app>
    <v-container>
      <div>
        <h1 class="display-1">Guestbook</h1>
        <p>ini adalah halaman bukutamu pengunjung</p>
        <br />
        <br />

        <!-- untuk tabel -->
        <v-card :elevation="5" class="pa-3">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="green darken-2 white--text" dark v-on="on">add guest</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Guest</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field v-model="guestbook.name" label="Name"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model.number="guestbook.nis" label="NIS" type="number"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field v-model="guestbook.purpose" label="Purpose"></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1 white--text" text @click="addGuestBook()">Save</v-btn>
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
                    <th>purpose</th>
                    <th>datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(g,idx) in guestbooks" :key="g.id">
                    <td>{{ (idx+1) }}</td>
                    <td>{{ g.name }}</td>
                    <td>{{ g.nis }}</td>
                    <td>{{ g.purpose }}</td>
                    <td>{{ readableDateTime(g.tanggal) }}</td>
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
import moment from "moment";

const apiService = new APIService();

export default {
  name: "Guestbook",
  data() {
    return {
      guestbooks: [],
      guestbook: {},
      menu1: false,
      dialog: false
    };
  },
  created() {
    this.getGuestbook();
  },
  computed: {},
  methods: {
    getGuestbook() {
      apiService.getData("guest_book").then(data => {
        this.guestbooks = data.guestbook;
        console.log(this.guestbooks);
      });
    },
    date() {
      return new Date().toISOString().substr(0, 10);
    },
    readableDateTime(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    addGuestBook(){
        this.guestbook.tanggal = this.date()
        apiService.postData("guest_book", this.guestbook).then(data => {
            console.log(this.guestbook)
            this.getGuestbook()
            this.dialog = false
        })
    }
  }
};
</script>