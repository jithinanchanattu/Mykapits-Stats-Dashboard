import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderLineChart();
  },
 computed: {
    chartData: function() {
      return this.data;
    }
  }, 
  methods: {
    renderLineChart: function() {
    
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.chartData
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );      
    }
  },
  watch: {
    data: function() {
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }  
}
