<template>

  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">My accounts</h3>
        </b-col>
        <b-col class="text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </b-col>
      </b-row>
    </template>

    <el-table class="table-responsive table"
              :data="tableData"
              header-row-class-name="thead-light">
      <el-table-column label="Account" min-width="110px">
        <template v-slot="{row}">
          <div class="font-weight-600" style="cursor: pointer;"  @click="$router.push({ name: 'Account', params: { id: row.account_number } })">
            <strong>{{row.account_number}}</strong>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="License" min-width="70px">
        <template v-slot="{row}">
          <div>{{row.key}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Initial value" min-width="90px">
        <template v-slot="{row}">
          <div>{{row.initial_value}}</div>
        </template>
      </el-table-column>

      <el-table-column label="Current value" min-width="90px">
        <template v-slot="{row}" >
          <div :class="row.current_value < row.initial_value ? 'text-danger' : 'text-success'">
            {{row.current_value}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </b-card>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    name: 'page-visits-table',
    props: {
      accounts: {
        type: Array,
        dafult: [],
        require: true
      }
    },
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      structureData() {
        this.tableData = this.accounts.map(({ account_number, current_value, initial_value, license }) => {
          return { account_number, current_value, initial_value, key: license.key }
        })
      }
    },
    mounted(){
      this.structureData()
    }
  }
</script>
<style>
</style>
