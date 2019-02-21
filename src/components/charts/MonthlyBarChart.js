import{ Bar, mixins } from 'vue-chartjs'

export default {
    extends: Bar,
    mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['2018', '2019'],
      datasets: [
        {
          label: 'Yearly Unique Users',
          backgroundColor: '#f87979',
          data: [230000, 6909]
        }
      ]
    })
  } 
}
