<template>
  <v-app id="app">
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
      <v-container
        class="nav-router"
        v-if="$vuetify.breakpoint.smAndUp && $store.state.user.user"
      >
        <v-row justify="center">
          <v-col sm="6" class="p-0 d-flex justify-center">
            <router-link v-slot="{ href, navigate }" to="/dashboard" custom>
              <v-btn color="red" :href="href" @click="navigate" text>
                {{ $t('Dashboard') }}
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" :width="$store.state.user.user ? 100 : ''">
            <span v-if="$store.state.user.user">
              {{ $store.state.user.user.name }}
            </span>
            <v-icon v-else>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn elevation="0" color="white" @click="loginDialog = true">
              <v-icon class="mr-2">mdi-login-variant</v-icon>
              {{ $t('Log In') }}
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn elevation="0" color="white" @click="registerDialog = true">
              <v-icon class="mr-2">mdi-account-plus</v-icon>
              {{ $t('Register') }}
            </v-btn>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-btn elevation="0" color="white" @click="logout">
              <v-icon class="mr-2">mdi-logout-variant</v-icon>
              {{ $t('Log Out') }}
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
            <v-btn small elevation="0" color="white" @click="chLang('tr')"
              >TR</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn small elevation="0" color="white" @click="chLang('eng')"
              >ENG</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <Register v-if="registerDialog" />
    <Login v-if="loginDialog" />
    <v-main>
      <v-navigation-drawer
        v-if="$vuetify.breakpoint.xs"
        v-model="drawer"
        width="50%"
        absolute
        temporary
        color="transparent"
        class="opacty"
      >
        <v-list nav shaped>
          <v-list-item-group class="mt-6">
            <v-list-item>
              <router-link v-slot="{ href, navigate }" to="/dashboard" custom>
                <span :href="href" @click="navigate" class="router-link-mobile">
                  <h3>{{ $t('Dashboard') }}</h3>
                </span>
              </router-link>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import i18n from './i18n/i18n.js'
import Register from './components/User/Register.vue';
import Login from './components/User/Login.vue';
export default {
  components: {
    Register,
    Login,
  },
  name: 'App',
  data() {
    return {
      lang: 'en',
      drawer: false,
      registerDialog: false,
      loginDialog: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch('user/userExist');
  },
  created() {
    if (this.$store.state.user.user == null) {
      this.loginDialog = true;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      if (this.$route.path != '/') this.$router.push({ path: '/' });
      this.loginDialog = true;
    },
    chLang(lang) {
      this.lang = lang;
      i18n.locale = lang;
    },
  },
};
</script>
<style>


</style>
