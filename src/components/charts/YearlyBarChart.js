import{ Bar} from 'vue-chartjs'

export default {
    extends: Bar,
    props:['getLabels', 'getDataSets'],
    mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.getLabels,
      datasets: [
        {
          label: 'Yearly Unique Users',
          backgroundColor: '#f87979',
          data: this.getDataSets
        }
      ]
    })
  } 
}
