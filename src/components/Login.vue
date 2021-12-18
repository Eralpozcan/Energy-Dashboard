<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="25%" max-width="600px">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Email"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Password"></v-text-field>
            </v-row>
            <v-row>
              <v-checkbox label="Remember Me"> </v-checkbox>
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
              <v-btn>
                Register
              </v-btn>
              <v-spacer>

              </v-spacer>
              <v-btn>
                Cancel
              </v-btn>
              <v-btn>
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
import {vuelidate} from '@/mixins/global'
  export default {
    mixins:[vuelidate],
    data: () => ({
      dialog: true,
    }),
  };
</script>
<style></style>
