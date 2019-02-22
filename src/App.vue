<template>
  <v-app>
    <v-navigation-drawer permanent class="light-blue darken-2" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <div v-if="pictureShow">
        <div class="user-border-image">
          <v-avatar size="200">
            <img src="@/assets/default-avatar-alien-monster.png">
          </v-avatar>
        </div>
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile avatar v-if="avatartMini">
          <v-list-tile-avatar>
            <img src="@/assets/default-avatar-alien-monster.png">
          </v-list-tile-avatar>
        </v-list-tile>

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

    <v-toolbar dark class="light-blue darken-1" app :clipped-left="clipped">
      <v-btn icon @click="minimizeSideBar">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Overview</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>refresh</v-icon>
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
  import { Vue, Component } from 'vue-property-decorator';
  
@Component
export default class App extends Vue {

  private clipped: boolean = false;
  private drawer: boolean = true;
  private fixed: boolean = false;
  private pictureShow: boolean = true;
  private avatartMini: boolean = false;
  private items: any[] = [
    {
      icon: 'dashboard',
      title: 'Dashboard',
      link: '/',
    },
    {
      icon: 'group_work',
      title: 'Devices',
      link: '/devices',
    },
    {
      icon: 'settings',
      title: 'Settings',
      link: '/contact',
    },
  ];

  private miniVariant: boolean = false;

  private minimizeSideBar() {
    this.miniVariant = !this.miniVariant;
    this.pictureShow = !this.pictureShow;
    this.avatartMini = !this.avatartMini;
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
