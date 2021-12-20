<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="25%" max-width="600px">
      <v-card>
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field v-model="user.name" label="Name"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.surname" label="Surname"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.email" label="Email"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="user.password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" label="Password" @click:append="showPass=!showPass" :type="showPass ? 'text' : 'password'"></v-text-field>
            </v-row>
            <v-row>
              <v-radio-group id="roleradio" label="Role" row v-model="user.role">
                <v-radio label="Admin" value="admin"></v-radio>
                <v-radio label="Editor" value="editor"></v-radio>
                <v-radio label="User" value="user"></v-radio>
              </v-radio-group>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>

            </v-row>
            <v-row class="d-flex justify-center">
              <v-btn rounded >
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn rounded @click="RegisterButton">
                Register
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
      },
        dialog: true,
        showPass: false,
        error:false,
      };
    },
    methods: {
      LoginButton(){
        this.$router.push({
          name:"Login",
        })
      },
      RegisterButton(){
        let userData = {
          user:this.user,
          remember:this.remember,

        };
        this.$store.dispatch('Register',userData)
      }
    },
};

</script>
<style></style>
