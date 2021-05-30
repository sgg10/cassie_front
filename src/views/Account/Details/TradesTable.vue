<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">Trades</h3>
    </b-card-header>
    <el-table id="tradesTable" border class="table-responsive table"
      header-row-class-name="thead-light"
      :data="pagedTableData"
    >
      <el-table-column
        label="Ticket"
        prop="ticket"
      />
      <el-table-column
        label="Open"
        prop="open_date"
      />
      <el-table-column
        label="Type"
        prop="type_operation"
      >
        <template v-slot="{row}">
          <div :class="row.type_operation === 'BUY' ? 'text-success' : 'text-danger'">
            <strong>{{ row.type_operation }}</strong>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Symbol"
        prop="symbol"
      />
      <el-table-column
        label="Take Profit"
        prop="takeprofit"
      />
      <el-table-column
        label="Stop Loss"
        prop="stoploss"
      />
      <el-table-column
        label="Profit"
        prop="profit"
      >
        <template v-slot="{row}">
          <div :class="row.profit > 0 ? 'text-success' : row.profit < 0 ?'text-danger' : ''">
            <strong>{{ row.profit }} USD</strong>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination v-model="currentPage" @change="setPage" :per-page="perPage" :total="nTrades" first-number></base-pagination>
    </b-card-footer>
  </b-card>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
export default {
  name: 'TradesTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: {
    reports: {
      default: () => ([]),
      type: Array,
      require: true
    }
  },
  data() {
    return {
      trades: [],
      currentPage: 1,
      perPage: 10
    }
  },
  methods: {
    structureData(){
      this.reports.forEach(({ trades }) => {
        trades.forEach(trade => this.trades.push(trade))
      })
    },
    setPage (val) {
        this.currentPage = val
      }
  },
  computed: {
    nTrades(){
      return this.trades.length
    },
    pagedTableData(){
      return this.trades.slice(this.perPage*this.currentPage-this.perPage, this.perPage*this.currentPage)
    }
  },
  mounted(){
    this.structureData()
  }
}
</script>