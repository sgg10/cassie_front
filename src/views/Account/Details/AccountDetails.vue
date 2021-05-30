<template>
  <b-card no-body class="card-profile">
    <b-card-body>
      <h2>Details</h2>
      <b-row>
        <b-col>
          <div class="card-profile-stats d-flex justify-content-center">
            <div>
              <span :class="account.is_active ? 'text-success' : 'text-danger'" class="heading">
                {{ account.is_active ? "Active" : "Disable" }}
              </span>
              <span class="description">Status</span>
            </div>
            <div>
              <span class="heading">{{ account.initial_value }} USD</span>
              <span class="description">Initial Value</span>
            </div>
            <div>
              <span :class="account.current_value >= account.initial_value ? 'text-success' : 'text-danger'" class="heading">
                {{ account.current_value }} USD
              </span>
              <span class="description">Current Value</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="card-profile-stats d-flex justify-content-center">
            <div>
              <span class="heading">{{totals.TP + totals.SL + totals.BE}}</span>
              <span class="description">Operations</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  name: 'AccountDetails',
  props: {
    account: {
      require: true,
      default: () => ({}),
      type: Object
    },
    totals: {
      require: true,
      default: () => ({}),
      type: Object
    }
  },
}
</script>