<template>
  <v-row justify="center">
    <v-dialog v-model="$parent.$parent.registerDialog" persistent width="25%" max-width="600px">
      <v-card>
        <v-card-title>{{ $t('Register') }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field v-model="user.name" label="Name" :rules="rules.nameRules"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.surname" label="Surname" :rules="rules.surnameRules"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.email" label="Email" :rules="rules.emailRules"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.password" :rules="rules.passwordRules" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" label="Password" @click:append="showPass=!showPass" :type="showPass ? 'text' : 'password'"></v-text-field>
            </v-row>
            <v-row>
              <v-radio-group id="roleradio" label="Role" row v-model="user.role">
                <v-radio label="Admin" value="admin"></v-radio>
                <v-radio label="Editor" value="editor"></v-radio>
                <v-radio label="User" value="user"></v-radio>
              </v-radio-group>
            </v-row>
            <v-row>
              <v-checkbox
                :label="$t('Remember Me')"
                v-model="user.remember"
              ></v-checkbox>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>

            </v-row>
            <v-row class="d-flex justify-center">
              <v-btn @click="$parent.$parent.registerDialog = false">
                {{ $t('Cancel') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="RegisterButton">
                {{ $t('Register') }}
              </v-btn>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>  
</template>

<script>
  export default {
    data(){ 
      return {
      user: {
        name:null,
        surname:null,
        email: null,
        password: null,
        role: null,
        remember: true,
      },
      rules: {
        nameRules: [
          (v) => !!v || this.$t('Name is required'),
          (v) =>
            String(v).length >= 3 ||
            this.$t('Name must be at least 3 characters'),
          (v) =>
            /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(v) ||
            this.$t('must be letters, numbers are not allowed'),
        ],
        surnameRules: [
          (v) => !!v || this.$t('Surname is required'),
          (v) =>
            String(v).length >= 3 ||
            this.$t('Name must be at least 3 characters'),
          (v) =>
            /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(v) ||
            this.$t('must be letters, numbers are not allowed'),
        ],        
        emailRules: [
          (v) => !!v || this.$t('Email is required'),
          (v) => /.+@.+/.test(v) || this.$t('Email must be valid'),
        ],
        passwordRules: [
          (v) => !!v || this.$t('Password is required'),
          (v) =>
            String(v).length >= 8 ||
            this.$t('Password must be at least 8 characters'),
          (v) =>
            /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
            this.$t('At least one capital letter and a number'),
        ],
      },      
        dialog: true,
        showPass: false,
        error:false,
      };
      
    },
    created() {
      if (window.localStorage.getItem('user')) {
        this.user = JSON.parse(window.localStorage.getItem('user'));
      }
    },
    methods: {
      RegisterButton(){
        let userData = {
          user:this.user,
          remember:this.remember,

        };
        this.$store.dispatch('user/register',userData)
        this.$parent.$parent.registerDialog = false
      }
    },
};

</script>
<style></style>
