<template>
  <div>
    <load-layout v-if="isLoading">
        <base-loading/>
    </load-layout>
    <div v-else>
      <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
        <b-row >
          <b-col lg="7" md="10">
            <h1 class="display-2 text-white">{{$route.params.id}}</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <stats-card
              title="Profit"
              :type="totals.profit >= 0 ? 'gradient-green' : 'gradient-red'"
              :sub-title="`${totals.profit}USD`"
              icon="ni ni-money-coins"
              class="mb-4"
            />
          </b-col>
          <b-col>
            <stats-card
              title="Take Profit"
              type="gradient-info"
              :sub-title="`${totals.TP}`"
              icon="ni ni-bold-up"
              class="mb-4"
            />
          </b-col>
          <b-col>
            <stats-card
              title="Stop Loss"
              type="gradient-red"
              :sub-title="`${totals.SL}`"
              icon="ni ni-bold-down"
              class="mb-4"
            />
          </b-col>
          <b-col>
            <stats-card
              title="Break Even"
              type="gradient-dark"
              :sub-title="`${totals.BE}`"
              icon="ni ni-fat-delete"
              class="mb-4"
            />
          </b-col>
        </b-row>
      </base-header>
      <b-container fluid class="mt--6" >
        <b-row>
          <b-col xl="4" class="order-xl-2 mb-5">
            <AccountDetails :account="account" :totals="totals"/>
          </b-col>
          <b-col xl="8" class="order-xl-1 mb-5">
            <BalanceChart :reports="reports"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <TradesTable :reports="reports"/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// Components
import BaseLoading from '@/components/BaseLoading.vue';
import LoadLayout from '../Layout/LoadLayout.vue';
import StatsCard from '../../components/Cards/StatsCard.vue';
import AccountDetails from './Details/AccountDetails'
import BalanceChart from './Details/BalanceChart'
import TradesTable from './Details/TradesTable';

// Api
import { userAccount } from '../../api/users'
import { getAccountReport } from '../../api/reports'

// Vuex
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Account',
  components: { StatsCard, BaseLoading, LoadLayout, AccountDetails, BalanceChart, TradesTable },
  data() {
    return {
      isLoading: false,
      account: {},
      totals: {
        BE: 0,
        SL: 0,
        TP: 0,
        profit: 0,
      },
      reports: []
    }
  },
  computed: {
    ...mapState('auth', ['user', 'access_token']),
  },
  methods: {
    ...mapActions('auth', ['refreshToken']),
    async getAccount(){
      this.account = (await userAccount(this.user.username, this.$route.params.id, this.access_token)).data[0]
      console.log(this.account)
    },
    async getReports() {
      this.reports = (await getAccountReport(this.account.account_number, this.access_token)).data
      this.reports.forEach(report => {
        if (report == this.reports[0]) {
          this.totals.profit += (report.balance - report.account.initial_value)
        }
        report.trades.forEach(trade => {
          if (trade.profit == 0){ this.totals.BE += 1 }
          else if (trade.profit < 0){ this.totals.SL += 1 }
          else if (trade.profit > 0){ this.totals.TP += 1 }
        })
      })
    },
    async getAllData(){
      try {
        await this.getAccount()
        await this.getReports()
      } catch (error) {
        console.log(error.response.data)
        await this.refreshToken(true)
        this.getAllData()
      }
    }
  },
  async created() {
    this.isLoading = true
    await this.getAllData()
    this.isLoading = false
  },
}
</script>