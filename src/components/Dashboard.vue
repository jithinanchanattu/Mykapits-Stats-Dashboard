<template>
  <v-app>
    <v-navigation-drawer permanent class="light-blue darken-2" mini-variant clipped fixed app>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="@/assets/default-avatar-alien-monster.png">
          </v-list-tile-avatar>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" class="white--text"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="light-blue darken-1" app>
      <v-toolbar-title class="white--text">Mykapits Free WiFi Statistics</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" @click="logout()" icon>
        Logout
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      items: [{
        icon: 'group_work',
        title: 'Devices',
        link: '/',
      },
      { 
        icon: 'settings',
        title: 'Settings',
        link: '/contact',
      }]
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
}
</script>

<style>
  .v-list__tile__title{
    font-size: large;
  }
  
  .user-border-image {
    padding: 40px;
  }
</style>
