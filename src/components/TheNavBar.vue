<template>
  <v-app id="nav">
    <v-app-bar
      app
      dark
      aling-center
      hide-on-scroll
      shaped
      src="https://www.ekonomiksolar.com/image/blog/enerji-turlerinin-iyi-ve-kotu-yanlari.jpg"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xs"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link v-slot="{ href, navigate }" to="/" custom>
        <v-toolbar-title :href="href" @click="navigate" role="button">
          <h2>Energy</h2>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-container>
        <v-row>
          <v-col>
            <router-link>
              <v-btn rounded> Dashboard </v-btn>
            </router-link>
          </v-col>
          <v-col>
            <router-link>
              <v-btn rounded> User Settings </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :width="$store.state.user.user ? 100 : ''">
            <span v-if="$store.state.user.user">
              {{ $store.state.user.user.name + $store.state.user.user.surname }}
            </span>
            <v-icon v-else>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn rounded>
              <v-icon>mdi-login-variant</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn rounded>
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="ml-6">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              small
              rounded
              elevation="0"
              color="white"
              @click="chLang('tr')"
              >TR</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn
              small
              rounded
              elevation="0"
              color="white"
              @click="chLang('eng')"
              >ENG</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <Register v-if="registerDialog" />
    <Login v-if="loginDialog" />

  </v-app>
</template>

<script>
import Register from './User/Register.vue'
import Login from './User/Login.vue';
  export default {
    name: "NavBar",
    components: {
      Register,
      Login,
    },
    data() {
      return {
        lang: "tr",
      };
    },
    watch: {},
    methods: {
      chLang(lang) {
        this.lang = lang;
        //Vuet.locale = lang;
      },
    },
  };
</script>
