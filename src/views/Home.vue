<template>
  <div class="viz">
    <Dashboard/>
  </div>
</template>

<script>
import Vue from 'vue';
import Dashboard from '@/components/Dashboard.vue'; // @ is an alias to /src

export default {
  name: 'home',
  components: {
    Dashboard,
  }
};
</script>

<style scoped>
  .viz {
      text-align: center;
    }
</style>
