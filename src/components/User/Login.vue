<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="25%" max-width="600px">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field v-model="user.email" label="Email"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" label="Password" @click:append="showPass=!showPass" :type="showPass ? 'text' : 'password'"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox v-model="user.remember" label="Remember Me"> </v-checkbox>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row >
              <v-alert v-if="error" type="error" dense outlined width="100%">
                
              </v-alert>
            </v-row>
            <v-row class="d-flex align-center">
              <v-btn @click="RegisterButton">
                Register
              </v-btn>
              <v-spacer>

              </v-spacer>
              <v-btn @click="CancelButton">
                Cancel
              </v-btn>
              <v-btn @click="LoginButton">
                Login
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
        email: null,
        password: null,
        remember:null,
      },
        dialog: true,
        showPass: false,
        error:false,
      };
    },
    watch:{

    },
    methods: {
      RegisterButton(){
        this.$router.push({
          name:"Register",
        })
      },
      LoginButton(){
        let payload = {
          email:this.user.email,
          password:this.user.password
        }
        let userData= {
          user:payload,
          remember: this.user.remember
        };
        this.$store.dispatch('Login',userData)
      },
      CancelButton(){
        if(this.dialog == true) {
          this.dialog = false
        }
      }
    },
};
</script>
<style></style>
