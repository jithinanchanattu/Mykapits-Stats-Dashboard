<template>
  <div class="viz">
    <Login/>
  </div>
</template>

<script>
import Vue from 'vue';
import Login from '@/components/Login.vue'; // @ is an alias to /src

export default {
  name: 'home',
  components: {
    Login,
  }
};
</script>

<style scoped>
  .viz {
      text-align: center;
    }
</style>
