<template>
  <v-app style="
    background-color: #111;
    background-image: linear-gradient(#064072, #000);
  ">     
    <v-container grid-list-xl text-xs-center>
       <v-layout row wrap>
         <v-flex xs4 offset-xs4>
            <h4 class="display-2 font-weight-bold white--text">Login</h4>
               <hr>
               <br>
               <v-form>
                 <v-text-field 
                   box
                   clearable
                   v-model="username"
                   label="Username"
                   prepend-icon="face"
                   type="text"
                   color="white"
                 >
                 </v-text-field>
                 <v-text-field 
                   box
                   clearable
                   v-model="password"
                   label="Password"
                   prepend-icon="lock"
                   type="password"
                   color="white"
                 >
                 </v-text-field>
              </v-form>
              <br>
              <v-btn @click="login()" block color="primary">Login</v-btn>
          </v-flex>
       </v-layout>
     </v-container>
  </v-app>
</template>
<script>
import axios from 'axios';
export default {
  components: {
  
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
        let name = this.username;
        let password = this.password;
        this.$store.dispatch("login", {name, password})
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    } 
  }       
};
</script>

<style scoped>
</style>
