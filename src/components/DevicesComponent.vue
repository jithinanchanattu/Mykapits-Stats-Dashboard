<template>
  <v-container fluid>
   <!--Filter By--> 
    <v-layout class="filter-by-wrapper">
        <v-flex xs12 sm2>
            <p>Filter By:</p>
            <v-btn-toggle v-model="filterModel">
              <v-btn fab value="yearly" class="blue-grey">
                Years
              </v-btn>
              <v-btn fab value="weekly" class="blue-grey">
                Weeks
              </v-btn>
              <v-btn fab value="daily" class="blue-grey">
                Days
              </v-btn>
            </v-btn-toggle>
        </v-flex>

        <v-flex xs12 sm4 class="wlangroup-wrapper">
            <v-select
              :items="tempwlan"
              v-model="wlanModel"
              v-on:change="getDevices"
              item-text="name"
              item-value="id"
              label="Select Wlan Group"
              hide-details
             ></v-select>
        </v-flex>

        <v-flex xs12 sm4 class="wlangroup-wrapper">
            <v-select
              :items="devices"
              v-model="devicesModel"
              v-on:change="getChart"
              item-text="name"
              item-value="mac"
              attach
              chips
              multiple
              label="Select Devices"
              hide-selected
             >
            </v-select>
            {{devicesModel}}
          </v-flex>
    </v-layout>

  <!--Conditional Subfilters-->
    <v-layout v-if="filterModel=='yearly'" class="selection-wrapper" justify-end>
          <v-flex xs12 sm2>
            <v-select
              v-model="yearModel"
              v-on:change="getChart"
              :items="year"
              item-value="year"
              box
              label="Select Year"
            ></v-select>
          </v-flex>
    </v-layout>
    <v-layout v-else class="selection-wrapper" justify-end> 
          <v-flex xs12 sm2>
            <v-select
              :items="year"
              box
              label="Select Year"
            ></v-select>
          </v-flex>
        
          <v-flex xs12 sm2>
            <v-select
              :items="year"
              box
              label="Select Month"
            ></v-select>
          </v-flex>
    </v-layout>

  <!--Charts-->
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <LineChart :data="dataChart"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
import LineChart from './charts/YearlyLineChart.js';
import axios from 'axios';

  export default {
    components: {
      LineChart,  
    },
    data() {
      return {
        devicesModel: [],
        wlanModel: null,
        filterModel: 'yearly',
        yearModel: 2018,
        tempwlan:[],
        devices: [],
        year: ['2018', '2019'],
        tempChart: [0,0,0,0,0,0,0,0,0,0,0,0],
        dataChart: null
      }
    },
  
    created(){
      this.getWlangroup();
    },
    methods : {
      getWlangroup() {
        axios.get('http://206.189.91.127:62000/mykapits_stats/wlangroup')
         .then((res) => res["data"].forEach(function(element){
          this.tempwlan.push({name:element.name, id:element._id})
        }.bind(this)))
        .catch(err => console.log(err))
      },
  
      getDevices() {
        console.log(this.wlanModel)
        this.devices.length=0;
        axios.get('http://206.189.91.127:62000/mykapits_stats/wlangroup/'+this.wlanModel)
         .then((res) => res["data"].forEach(function(element){
          this.devices.push({name:element.name, mac:element.mac})
        }.bind(this)))
        .catch(err => console.log(err))
      },

       getChart() {
        if(this.filterModel == "yearly") {
          this.tempChart = [0,0,0,0,0,0,0,0,0,0,0,0]
          axios.get('http://206.189.91.127:62000/mykapits_stats/'+this.devicesModel[0]+'/'+this.yearModel)
          .then((res) => res["data"].forEach(function(element){
              this.tempChart[element._id.month-1] = element.distinct
              this.dataChart = this.tempChart
          }.bind(this), console.log(this.dataChart))) 
          .catch(err => console.log(err))
        }
      }
    }
   }
</script>

<style scoped>
  .filter-by-wrapper {
    margin-bottom: 80px;
  }

  .wlangroup-wrapper {
    padding-top: 30px;
  }

  .selection-wrapper {
    padding-right: 30px;
  }
</style>
