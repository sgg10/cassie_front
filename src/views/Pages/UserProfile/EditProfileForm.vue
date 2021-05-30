<template>
  <card>
    <load-layout v-if="isLoading">
        <base-loading/>
    </load-layout>
    <div v-else >
      <b-row align-v="center" slot="header" >
        <b-col cols="8">
          <h3 class="mb-0">Edit profile </h3>
        </b-col>
        <b-col cols="4" class="text-right">
          <a @click="updateProfile" v-if="is_edited" class="btn btn-sm btn-info btnsave">Save</a>
        </b-col>
      </b-row>

      <b-form @submit.prevent="updateProfile">
        <h6 class="heading-small text-muted mb-4">User information</h6>

        <div class="pl-lg-4">
          <b-row>
            <b-col lg="6">
              <base-input
                type="text"
                label="Username"
                placeholder="Username"
                v-model="user_edited.username"
              >
              </base-input>
            </b-col>
            <b-col lg="6">
              <base-input
                type="email"
                label="Email address"
                placeholder="mike@email.com"
                v-model="user_edited.email"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row >
            <b-col lg="6">
              <base-input
                type="text"
                label="First Name"
                placeholder="First Name"
                v-model="user_edited.first_name"
              >
              </base-input>
            </b-col>
            <b-col lg="6">
              <base-input
                type="text"
                label="Last Name"
                placeholder="Last Name"
                v-model="user_edited.last_name"
              >
              </base-input>
            </b-col>
          </b-row>
        </div>
        <hr class="my-4">

        <!-- Address -->
        <h6 class="heading-small text-muted mb-4">Contact information</h6>

        <div class="pl-lg-4">
          <b-row>
            <b-col md="12">
              <base-input
                type="text"
                label="Phone number"
                placeholder="+57 3214567891"
                v-model="user_edited.phone_number"
              >
              </base-input>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </div>
  </card>
</template>

<script>
import BaseLoading from '../../../components/BaseLoading.vue';
import LoadLayout from '../../Layout/LoadLayout.vue';
import { mapState, mapMutations, mapActions } from 'vuex'
import { updateUser } from '../../../api/users'
export default {
  name: 'EditProfileForm',
  components: { BaseLoading, LoadLayout },
  data() {
    return {
      is_edited: false,
      user_edited: {},
      isLoading: false
    }
  },
  methods: {
    ...mapMutations('auth', { setUser: 'SET_USER' }),
    ...mapActions('auth', ['refreshToken']),
    updateProfile() {
      this.isLoading = true
      updateUser(this.user.username, this.user_edited, this.access_token)
        .then(({ data }) => {
          this.setUser(data)
        })
        .catch(err => {
          if (err.response.data.code === 'token_not_valid'){
            this.refreshToken(true)
            this.updateProfile()
          }
        })
        .finally(() => this.isLoading = false)
    },
    setEdited(){
      if(this.areObjEquals(this.user_edited, this.user)){
        this.is_edited = false
      } else {
        this.is_edited = true
      }
    },
    areObjEquals(obj1, obj2){
      let equal = true
      for (let [key, val] of Object.entries(obj1)){
        if (obj2.hasOwnProperty(key)){
          if(obj2[key] !== val){
            equal = false
          }
        } else {
          equal = false
        }
      }
      return equal
    }
  },
  computed: {
    ...mapState('auth', ['user', 'access_token']),
  },
  created () {
    this.user_edited = {...this.user}
  },
  updated () {
    this.setEdited()
  }
};
</script>