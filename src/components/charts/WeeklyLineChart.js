import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ["data", "name", "options"],
  mounted() {
    this.renderLineChart();
  },
 computed: {
    chartData: function() {
      return this.data;
    },
    chartName: function() {
      return this.name;
    }
  
  }, 
  methods: {
    renderLineChart: function() {
    this.renderChart(
      {
        labels: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6"
        ],
        datasets: [
          {
            label: this.chartName,
            backgroundColor: "#f87979",
            data: this.chartData
          }
        ]
      },{scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false}
          // { responsive: true, maintainAspectRatio: false }
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
