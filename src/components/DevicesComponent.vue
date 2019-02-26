<template>
  <v-container fluid>
   <!--Filter By--> 
    <v-layout class="filter-by-wrapper">
        <v-flex xs12 sm2>
            <p>Filter By:</p>
            <v-select
              v-model="filterModel"
              v-on:change="getChart"
              :items="filter"
              item-text="filter"
              item-value="filter"
              box
              label="Select Filter By"
            ></v-select>        
        </v-flex>

        <v-flex xs3 offset-sm1 class="wlangroup-wrapper">
            <v-select
              :items="tempwlan"
              v-on:change="getDevices"
              v-model = "wlanModel"
              item-text="name"
              item-value="_id"
              label="Select Wlan Group"
              hide-details
             ></v-select>
        </v-flex>
        <v-flex xs3 offset-sm1 class="wlangroup-wrapper">
            <v-select
              :items="devices"
              v-on:change="getChart"
              v-model = "devicesModel"
              item-text="name"
              item-value="mac"
              label="Select Devices"
              chips
              multiple
              return-object
              hide-selected 
            ></v-select>
        </v-flex>
      </v-layout>

  <!--Conditional Subfilters-->
    <v-layout v-if="filterModel=='Monthly'" class="selection-wrapper" justify-end>
          <v-flex xs12 sm2>
            <v-select
              v-model="yearModel"
              v-on:change="getChart"
              :items="year"
              item-text="year"
              item-value="year"
              box
              label="Select Year"
            ></v-select>
          </v-flex>
    </v-layout>
    <v-layout v-else class="selection-wrapper" justify-end> 
           <v-flex xs12 sm2>
            <v-select
              v-model="yearModel"
              v-on:change="getChart"
              :items="year"
              item-text="year"
              item-value="year"
              box
              label="Select Year"
            ></v-select>
          </v-flex>
        
          <v-flex xs12 sm2>
            <v-select
              v-model="monthModel"
              v-on:change="getChart"
              :items="month"
              item-text="mos"
              item-value="value"
              box
              label="Select Month"
            ></v-select>       
          </v-flex>
    </v-layout>

  <!--Charts-->
   <v-layout v-if="filterModel == 'Monthly' && dataChart.length > 0" row wrap>
      <v-flex class="flex-chart" v-for="chart in dataChart" xs12 sm12 md12>
        <MonthlyChart :styles="{height: '450px', width: '1230px' }" :data="chart.trends" :name="chart.name"/>
        <v-btn @click="remove(chart.name)" fab dark small color="red">
          X
        </v-btn>
      </v-flex>
      <!--<MonthlyChart  :data="chart.trends" :name="chart.name"/>
        <span class="remove-button">x</span>-->
   </v-layout>
   <v-layout v-else-if="filterModel=='Weekly' && weekDataChart.length > 0" row wrap>
      <v-flex xs12 sm12 md12>
        <v-flex class="flex-chart" v-for="chart in weekDataChart" xs12 sm12 md12>
          <WeeklyChart :styles="{height: '450px', width: '1230px' }" :data="chart.trends" :name="chart.name"/>
           <v-btn @click="remove(chart.name)" fab dark small color="red">
            X
           </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>

    <v-layout v-else-if="filterModel=='Weekly' && weekDataChart.length == 0">
      <v-flex xs12 sm12 md12>
        <WeeklyChart />
      </v-flex>
    </v-layout>

    <v-layout v-else-if="filterModel=='Monthly' && dataChart.length == 0">
      <v-flex xs12 sm12 md12>
        <MonthlyChart />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MonthlyChart from './charts/YearlyLineChart.js';
import WeeklyChart from './charts/WeeklyLineChart.js';
import axios from 'axios';

  export default {
    components: {
      MonthlyChart,
      WeeklyChart  
    },
    data() {
      return {
        filter: ['Monthly', 'Weekly'],
        devicesModel: [],
        filterModel: 'Monthly',
        wlanModel:"5a9eb593e4b0018a44c1e588",
        yearModel: '2019',
        monthModel:1,
        tempwlan:null,
        devices: null,
        month: [
          {'mos':'January','value':1}, {'mos':'February','value':2}, {'mos':'March','value':3}, {'mos':'April','value':4}, {'mos':'May','value':5},
          {'mos':'June','value':6}, {'mos':'July','value':7}, {'mos':'August','value':8}, {'mos':'Septemeber','value':9}, {'mos':'October','value':10},
          {'mos':'November','value':11}, {'mos':'December','value':12}
        ],
        year: ['2019', '2018'],
        monthChart: [0,0,0,0,0,0,0,0,0,0,0,0],
        dataChart: [],
        weekChart: [],
        weekDataChart: []
      }
    },
  
    created(){
      this.getWlangroup();
    },
    methods : {
      async getWlangroup() {
        let res = await axios.get('http://206.189.91.127:62000/mykapits_stats/wlangroup')
        this.tempwlan = res["data"]
        this.getDevices()
      },
  
      async getDevices() {
        this.devices = null;
        let res = await axios.get('http://206.189.91.127:62000/mykapits_stats/wlangroup/'+this.wlanModel)
        this.devices = res["data"]
      },

      async getChart() {
       if(this.filterModel == "Monthly") {
          let i = 0;
          this.dataChart = [];
          for(; i < this.devicesModel.length; i++) {
            this.weekChart =[]
            this.monthChart = [0,0,0,0,0,0,0,0,0,0,0,0];
            let res =  await axios.get('http://206.189.91.127:62000/mykapits_stats/'+this.devicesModel[i]['mac']+'/'+this.yearModel)
            res["data"].forEach(function(element){
                this.monthChart[element._id.month-1] = element.distinct
            }.bind(this))
            this.dataChart.push({name:this.devicesModel[i]['name'], trends:this.monthChart})
          }
        } else {
          let i = 0;
          this.weekDataChart = [];
          for(; i < this.devicesModel.length; i++) {
            this.monthChart = [0,0,0,0,0,0,0,0,0,0,0,0];
            this.weekChart = [];
            let res =  await axios.get('http://206.189.91.127:62000/mykapits_stats/'+this.devicesModel[i]['mac']+'/'+this.yearModel+'/'+this.monthModel)
            res["data"].sort((a, b) => (a._id.week > b._id.week)?1 : -1)
            let minVal = (Math.min(...res['data'].map(s=>s._id.week)));
            let maxVal = (Math.max(...res['data'].map(s=>s._id.week)));
            for(minVal; minVal <= maxVal; minVal++){
              let result = res['data'].find(data => data._id.week == minVal)
              result !== undefined ? this.weekChart.push(result.distinct):this.weekChart.push(0)
            }
            this.weekDataChart.push({name:this.devicesModel[i]['name'], trends:this.weekChart})
          }
        }
      }, 
      async remove(name) {
        let dataChartIndex = this.dataChart.map(function(item) { return item.name; }).indexOf(name);
        let weekDataChartIndex = this.weekDataChart.map(function(item) { return item.name; }).indexOf(name);
        let devicesIndex = this.devicesModel.map(function(item) {return item.name;}).indexOf(name)
        this.devicesModel.splice(devicesIndex,1);        
        this.dataChart.splice(dataChartIndex, 1);
        this.weekDataChart.splice(weekDataChartIndex, 1);
      }
    }
   }
</script>

<style scoped>
  .filter-by-wrapper {
    margin-bottom: 50px;
  }

  .wlangroup-wrapper {
    padding-top: 30px;
  }

  .selection-wrapper {
    padding-right: 30px;
  }
  .remove-button:hover {
    cursor:pointer;
    color: blue;
  }
  .flex-chart {
    display:inline-flex;
  }
</style>
