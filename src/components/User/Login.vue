<template>
  <v-dialog
    v-model="$parent.$parent.loginDialog"
    :width="
      $vuetify.breakpoint.lgAndUp
        ? '25%'
        : $vuetify.breakpoint.smAndDown
        ? '75%'
        : '50%'
    "
    persistent
  >
    <v-card>
      <v-card-title> {{ $t("Login") }} </v-card-title>
      <v-card-text>
        <v-form @keyup.native.enter.prevent="login">
          <v-container>
            <v-row>
              <v-text-field
                label="Email"
                v-model="user.email"
                :rules="rules.emailRules"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                :label="$t('Password')"
                v-model="user.password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox
                :label="$t('Remember Me')"
                v-model="remember"
              ></v-checkbox>
              {{ authenticated }}
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container fluid>
          <v-row v-if="$store.state.user.authError">
            <v-alert type="error" dense outlined width="100%">
              {{ $t("Login failed") }}
            </v-alert>
          </v-row>
          <v-row v-else justify="end" class="d-flex align-center">
            <v-btn
              small
              @click="
                ($parent.$parent.registerDialog = true),
                  ($parent.$parent.loginDialog = false)
              "
            >
              {{ $t("Register") }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="$parent.$parent.loginDialog = false">
              {{ $t("Cancel") }}
            </v-btn>
            <v-btn text @click="login">
              <v-progress-circular
                v-if="
                  $store.state.user.authenticated == false &&
                  $store.state.user.authError == false
                "
                indeterminate
                :size="20"
                style="background: transparent"
              ></v-progress-circular>
              <span v-else>{{ $t("Login") }}</span>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      remember: true,
      authenticated: null,
      //authError: null,
      showPass: false,
      user: {
        email: null,
        password: null,
      },
      rules: {
        emailRules: [
          (v) => !!v || this.$t("Email is required"),
          (v) => /.+@.+/.test(v) || this.$t("Email must be valid"),
        ],
      },
    };
  },
  mounted() {
    if (window.localStorage.getItem("user")) {
      this.user = JSON.parse(window.localStorage.getItem("user"));
    }
  },
  watch: {
    "$store.state.user.auth": {
      handler(val) {
        if (val) {
          this.$parent.$parent.loginDialog = false;
        }
      },
    },
    "$store.state.user.authError": {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.$store.state.user.authError = false;
          }, 1500);
        }
      },
    },
  },
  methods: {
    login() {
      let payload = {
        email: this.user.email,
        password: this.user.password,
      };
      let userData = {
        remember: this.remember,
        user: payload,
      };
      this.$store.dispatch("user/login", userData);
    },
  },
};
</script>

<style></style>
