<template>
  <div>
    <load-layout v-if="isLoading">
        <base-loading/>
    </load-layout>

    <div v-else>
      <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
        <!-- Card stats -->
        <b-row>
          <b-col xl="3" md="6">
            <stats-card title="Total profit"
                        :type="totals.profit >= 0 ? 'gradient-green' : 'gradient-red'"
                        :sub-title="`${totals.profit}USD`"
                        icon="ni ni-money-coins"
                        class="mb-4">
            </stats-card>
          </b-col>
          <b-col xl="3" md="6">
            <stats-card title="Take Profit"
                        type="gradient-info"
                        :sub-title="`${totals.TP}`"
                        icon="ni ni-bold-up"
                        class="mb-4">
            </stats-card>
          </b-col>
          <b-col xl="3" md="6">
            <stats-card title="Stop Loss"
                        type="gradient-red"
                        :sub-title="`${totals.SL}`"
                        icon="ni ni-bold-down"
                        class="mb-4">
            </stats-card>

          </b-col>
          <b-col xl="3" md="6">
            <stats-card title="Break Even"
                        type="gradient-dark"
                        :sub-title="`${totals.BE}`"
                        icon="ni ni-fat-delete"
                        class="mb-4">
            </stats-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="3" md="6">
            <stats-card title="Available Spaces"
                        type="gradient-green"
                        :sub-title="`${totals.available_spaces}`"
                        icon="ni ni-check-bold"
                        class="mb-4">
            </stats-card>
          </b-col>
        </b-row>
      </base-header>

      <!--Charts-->
      <b-container fluid class="mt--7">
        <!-- <b-row>
          <b-col xl="8" class="mb-5 mb-xl-0">
            <card type="default" header-classes="bg-transparent">
              <b-row align-v="center" slot="header">
                <b-col>
                  <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 class="h3 text-white mb-0">Monthly Profit</h5>
                </b-col>
              </b-row>
              <line-chart
                :height="350"
                ref="profitChar"
                :chart-data="profitChar.chartData"
                :extra-options="profitChar.extraOptions"
              >
              </line-chart>
            </card>
          </b-col>

          <b-col xl="4" class="mb-5 mb-xl-0">
            <card header-classes="bg-transparent">
              <b-row align-v="center" slot="header">
                <b-col>
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                  <h5 class="h3 mb-0">Total orders</h5>
                </b-col>
              </b-row>

              <bar-chart
                :height="350"
                ref="barChart"
                :chart-data="redBarChart.chartData"
              >
              </bar-chart>
            </card>
          </b-col>
        </b-row>
        End charts -->

        <!--Tables-->
        <b-row class="mt-1">
          <b-col xl="8" class="mb-5 mb-xl-0">
            <AccountsTable :accounts="accounts"/>
          </b-col>
          <b-col xl="4" class="mb-5 mb-xl-0">
            <AccountPercentsTable :accounts="accounts"/>
          </b-col>
        </b-row>
        <!--End tables-->
      </b-container>
    </div>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';
  import BaseLoading from '../components/BaseLoading.vue';
  import LoadLayout from './Layout/LoadLayout.vue';

  // Tables
  import AccountPercentsTable from './Dashboard/AccountsPercentsTable';
  import AccountsTable from './Dashboard/AccountsTable';

  // API
  import { userAccounts, userLicenses } from '../api/users'
  import { getAccountReport } from '../api/reports'

  // Vuex
  import { mapState, mapActions } from 'vuex'
import { lab, time, values } from 'd3';

  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      AccountsTable,
      AccountPercentsTable,
      BaseLoading,
      LoadLayout
    },
    data() {
      return {
        profitChar: {
          allData: [[]],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Monthly Profit',
                data: [0, 20, 10, 30, 15, 40, 20, 110],
              }
            ],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        },
        accounts: [],
        licenses: [],
        totals: {
          BE: 0,
          SL: 0,
          TP: 0,
          profit: 0,
          available_spaces: 0
        },
        times: {
          mounth: 1,
          report_mounth: 0
        },
        profit_data:{},
        profile_data_list: [],
        isLoading: false
      };
    },
    methods: {
      ...mapActions('auth', ['refreshToken']),
      async initBigChart(index) {
        let labels = []
        console.log(this.profile_data_list)
        this.profile_data_list.forEach(value => {
          labels.push(value[0])
          this.profitChar.allData[0].push(value[1])
        })
        console.log(this.profile_data_list)
        let chartData = {
          datasets: [
            {
              label: 'Monthly Profit',
              data: this.profitChar.allData
            }
          ],
          labels: labels
        }
        this.profitChar.chartData = chartData;
        this.profitChar.activeIndex = index;
      },
      async getAccounts(){
        this.accounts = (await userAccounts(this.user.username, this.access_token)).data
      },
      async getLicenses(){
        this.licenses = (await userLicenses(this.user.username, this.access_token)).data
      },
      async getAllReports(){
        this.accounts.forEach(async account => {
          const reports = (await getAccountReport(account.account_number, this.access_token)).data
          reports.forEach(report => {
            if(report == reports[0]){
              this.totals.profit += (report.balance - report.account.initial_value)
            }
            report.trades.forEach(trade => {
              if (trade.profit == 0){ this.totals.BE += 1 }
              else if (trade.profit < 0){ this.totals.SL += 1 }
              else if (trade.profit > 0){ this.totals.TP += 1 }
            })
            this.setProfitData(report)
          })
        })
        this.licenses.forEach(license => {
          this.totals.available_spaces += license.available_spaces
        })
      },
      async getAllData(){
        try {
          await this.getLicenses()
          await this.getAccounts()
          await this.getAllReports()
          console.log(this.licenses)
          console.log(this.accounts)
        } catch (error) {
          console.log(error.response.data)
          this.refreshToken(true)
          this.getAllData()
        }
      },
      setProfitData(report){
        if(this.times.report_mounth==0) { this.times.report_mounth = report.date.split('-')[1] }
        if(this.times.report_mounth!=report.date.split('-')[1]){
          this.times.report_mount = report.date.split('-')[1]
          this.times.mounth += 1
        }
        if (!this.profit_data[`${this.times.mounth}`]) {
          this.profit_data[`${this.times.mounth}`] = report.total_profit
        } else {
          this.profit_data[`${this.times.mounth}`] += report.total_profit
        }
        this.profile_data_list = Object.entries(this.profit_data)
      }
    },
    computed: {
      ...mapState('auth', ['user', 'access_token']),
    },
    async created() {
      this.isLoading = true
      await this.getAllData()
      await this.initBigChart(0);
      this.isLoading = false
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
