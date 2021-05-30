<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Account</h6>
                <h5 class="h3 text-white mb-0">Balance</h5>
              </b-col>
            </b-row>
            <line-chart
              ref="bigChart"
              :chart-data="balanceChart.chartData"
              :extra-options="balanceChart.extraOptions"
            />
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// Charts
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';
export default {
  name: 'BalanceChart',
  props: {
    reports: {
      type: Array,
      default: () => ([]),
      require: true
    }
  },
  components: { LineChart },
  data() {
    return {
      operations: [],
      balanceChart: {
        allData: [],
        chartData: {
          datasets: [
            {
              label: "Balance",
              data: []
            }
          ],
          labels: []
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    }
  },
  methods: {
    structureData(){
      this.reports.forEach(({ trades }) => {
        trades.forEach(trade => this.operations.push(trade))
      })
      this.operations.reverse()
    },
    initBalanceChart(){
      let data = [0]
      let labels = [0]
      let amount = 0;
      for (let i = 0; i < this.operations.length; i++){
        let { profit } = this.operations[i]
        amount += profit
        data.push(amount)
        labels.push(i+1)
      }
      let chartData = {
        datasets: [
          {
            label: 'Balance',
            data
          }
        ],
        labels
      }
      this.balanceChart.chartData = chartData
    }
  },
  mounted(){
    this.structureData()
    this.initBalanceChart()
  }
}
</script>