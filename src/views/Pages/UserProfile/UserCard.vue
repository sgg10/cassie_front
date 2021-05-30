<template>
  <b-card no-body class="card-profile" alt="Image placeholder" img-top>
    <b-card-body class="pt-0">
      <load-layout v-if="isLoading">
        <base-loading />
      </load-layout>
      <div v-else>
        <b-row>
          <b-col>
            <div
              class="card-profile-stats d-flex justify-content-center mt-md-5"
            >
              <div>
                <span class="heading">{{ nLicenses }}</span>
                <span class="description">Licenses</span>
              </div>
              <div>
                <span class="heading">{{ nAccounts }}</span>
                <span class="description">Accounts</span>
              </div>
            </div>
          </b-col>
        </b-row>
        <div class="text-center">
          <h5 class="h3">{{ user.first_name }} {{ user.last_name }}</h5>
          <div class="h5 mt-4">
            <i class="ni business_briefcase-24 mr-2"></i>@{{ user.username }} is
            active user of Cassie
          </div>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import BaseLoading from "../../../components/BaseLoading.vue";
import LoadLayout from "../../Layout/LoadLayout.vue";
import { userLicenses, userAccounts } from "../../../api/users";
import { mapState, mapActions } from "vuex";
export default {
  name: "UserCard",
  components: { BaseLoading, LoadLayout, BaseLoading },
  data() {
    return {
      isLoading: false,
      licenses: [],
      accounts: []
    };
  },
  computed: {
    ...mapState("auth", ["user", "access_token"]),
    nLicenses() {
      return this.licenses.length;
    },
    nAccounts() {
      return this.accounts.length;
    }
  },
  methods: {
    ...mapActions("auth", ["refreshToken"]),
    getLicenses() {
      this.isLoading = true;
      userLicenses(this.user.username, this.access_token)
        .then(({ data }) => {
          this.licenses = data;
          userAccounts(this.user.username, this.access_token).then(
            ({ data }) => {
              this.accounts = data;
            }
          );
        })
        .catch(err => {
          if (err.response.data.code === "token_not_valid") {
            this.refreshToken(true);
            this.getLicenses();
          }
        })
        .finally(() => (this.isLoading = false));
    }
  },
  async created() {
    this.getLicenses();
  }
};
</script>
<style></style>
