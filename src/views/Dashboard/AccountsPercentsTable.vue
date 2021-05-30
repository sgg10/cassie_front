<template>
  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">Profits</h3>
        </b-col>
        <b-col class="text-right">
          <base-button size="sm" type="primary">See all</base-button>
        </b-col>
      </b-row>
    </template>

    <el-table
      class="table-responsive table"
      :data="tableData"
      header-row-class-name="thead-light"
    >
      <el-table-column label="Account" min-width="115px" prop="account_number">
        <template v-slot="{ row }">
          <div class="font-weight-600">{{ row.account_number }}</div>
        </template>
      </el-table-column>

      <el-table-column label="Profit" min-width="110px" prop="profit">
      </el-table-column>

      <el-table-column min-width="220px" prop="progress">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <span class="mr-2"
              >{{ showProgressLabel(row.progress, row.progressType) }}%</span
            >
            <base-progress
              :type="row.progressType"
              :value="showProgressBar(row.progress, row.progressType)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </b-card>
</template>

<script>
import { BaseProgress } from "@/components";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "element-ui";
export default {
  name: "social-traffic-table",
  props: {
    accounts: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  components: {
    BaseProgress,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    structureData() {
      this.tableData = this.accounts.map(
        ({ account_number, current_value, initial_value }) => {
          const profit = current_value - initial_value;
          let progress = ((profit + initial_value) * 100) / initial_value - 100;
          const progressType = this.getProgressType(progress);
          progress = progress > 0 ? progress : 100 - Math.abs(progress);
          progress = current_value === initial_value ? 0 : progress;
          return {
            account_number,
            profit: `${profit} USD`,
            progress,
            progressType
          };
        }
      );
    },
    getProgressType(progress) {
      if (progress >= 0 && progress < 50) {
        return "gradient-info";
      } else if (progress >= 50) {
        return "gradient-success";
      } else if (progress < 0 && progress > -50) {
        return "gradient-warning";
      }
      return "gradient-danger";
    },
    showProgressLabel(progress, progressType) {
      progress = parseFloat(progress);
      if (
        progressType === "gradient-warning" ||
        progressType === "gradient-danger"
      ) {
        progress = -(100 - progress);
      }
      return progress;
    },
    showProgressBar(progress, progressType) {
      let realProgress = this.showProgressLabel(progress, progressType);
      while (realProgress > 100) {
        realProgress -= 100;
      }
      return realProgress < 0 ? progress : realProgress;
    }
  },
  mounted() {
    this.structureData();
  }
};
</script>
