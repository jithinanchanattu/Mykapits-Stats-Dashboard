<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm4 md4>
          <v-card class="distinct-wrapper" color="blue-grey">
            <v-card-title primary class="white--text title">{{ totalDistinct }}</v-card-title>
            <v-card-text class="white--text">Total Unique Users</v-card-text>
          </v-card>
        </v-flex>
      
        <v-flex d-flex xs12 sm4 md4>
          <v-card class="distinct-wrapper" color="blue-grey">
            <v-card-title primary class="white--text title">{{ totalDistinct }}</v-card-title>
            <v-card-text class="white--text">AP Devices</v-card-text>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm4 md4>
          <v-card class="distinct-wrapper" color="blue-grey">
            <v-card-title primary class="white--text title">{{ totalDistinct }}</v-card-title>
            <v-card-text class="white--text">WLAN Groups</v-card-text>
          </v-card>
        </v-flex>
        <YearlyBarChart/>
      </v-layout>
      
    
    </v-container>
</template>
<script>
import YearlyBarChart from './charts/YearlyBarChart.js';
import axios from 'axios';
export default {
      components: {
        YearlyBarChart,
      },
      data() {
        return {
          totalDistinct: null,
          error: null,
        };
      },
     created() {
        this.fillData(); 
     },
     methods: {
        fillData() {
         axios.get('http://206.189.91.127:62000/mykapits_stats')
          .then((res) => this.totalDistinct = res.data.data)
          .catch(err=>console.log(err, "displayed"));
          
        }
      }
    };
</script>

<style scoped>
  .distinct-wrapper {
    padding: 35px;
  }
  .distinct-wrapper > .title {
    font-size: 70px !important;
  }
  
  .v-card__text {
    font-size: 20px;
  }
</style>
