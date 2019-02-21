<template>
  <v-container fluid>
    <v-layout class="filter-by-wrapper">
        <v-flex xs12 sm2>
            <p>Filter By:</p>
            <v-btn-toggle>
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
           <v-autocomplete
              v-model="model"
              :items="states"
              label="Select WLAN Group"
              persistent-hint
              prepend-icon="mdi-city"
            >
              <v-slide-x-reverse-transition
                slot="append-outer"
                mode="out-in"
              >
              </v-slide-x-reverse-transition>
            </v-autocomplete>
        </v-flex>

        <v-flex xs12 sm4 class="wlangroup-wrapper">
          <v-select
              v-model="selectedDevices"
              :items="devices"
              attach
              label="Select Devices"
              multiple
            ></v-select>
        </v-flex>
    </v-layout>
    <v-layout class="selection-wrapper" justify-end> 
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
            label="Select Year"
          ></v-select>
        </v-flex>
    </v-layout>

      <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <LineChart/>
          Total: 560
        <LineChart/>
        <LineChart/>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
import LineChart from './charts/LineChart.js';

  export default {
    components: {
      LineChart,  
    },
    data() {
      return {
        model: null,
        states: ['Z Street', 'Kapits' ,'Default', 'Cafe Juanita', 'San Antonio', 'hey'],
        devices: ['foo', 'bar', 'fizz', 'buzz'],
        selectedDevices: [],
        year: ['2018', '2019'],
      }
    },
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
