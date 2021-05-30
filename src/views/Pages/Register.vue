<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create an account</h1>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <LoadLayout v-if="registerLoading">
                <BaseLoading variant="success"/>
              </LoadLayout>
              <div v-else>
                <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                  <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-hat-3"
                                placeholder="First name"
                                name="First name"
                                :rules="{required: true}"
                                v-model="form.first_name">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-hat-3"
                                placeholder="Last Name"
                                name="Last name"
                                :rules="{required: true}"
                                v-model="form.last_name">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-mobile-button"
                                placeholder="Phone number"
                                name="Phone number"
                                :rules="{required: true}"
                                v-model="form.phone_number">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-email-83"
                                placeholder="Email"
                                name="Email"
                                :rules="{required: true, email: true}"
                                v-model="form.email">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-circle-08"
                                placeholder="Username"
                                name="Username"
                                :rules="{required: true}"
                                v-model="form.username">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-lock-circle-open"
                                placeholder="Password"
                                type="password"
                                name="Password"
                                :rules="{required: true, min: 8}"
                                v-model="form.password">
                    </base-input>

                    <base-input alternative
                                class="mb-3"
                                prepend-icon="ni ni-lock-circle-open"
                                placeholder="Confirm password"
                                type="password"
                                name="Confirm Password"
                                :rules="{required: true, min: 8}"
                                v-model="form.password_confirmation">
                    </base-input>
                    <div class="text-center">
                      <b-button type="submit" variant="primary" class="mt-4">Create account</b-button>
                    </div>
                  </b-form>
                </validation-observer>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { signup } from '../../api/auth'
import showToast from '../../util/showToast'
import LoadLayout from '../Layout/LoadLayout'
import BaseLoading from '../../components/BaseLoading'
export default {
  name: 'Register',
  components: { LoadLayout, BaseLoading },
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
      },
      registerLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.registerLoading = true
      signup(this.form)
        .then(({ data }) => {
          showToast(
            this.$bvToast,
            'Complete your register',
            `We send a verification email to ${data.email}, active your account to continue.`,
            'success'
          )
          setTimeout(() => this.$router.push({ path: '/login' }), 3000)
        })
        .catch(err => showToast(
          this.$bvToast,
          'Error',
          this.getError(err),
          'danger'
        ))
        .finally(() => {
          this.registerLoading = false
        })
    },
    getError (err) {
      const { data } = err.response
      let errors = Object.entries(data)
      errors = errors.map(error => `${error[0]}: ${error[1][0]}`)
      let message = ''
      errors.forEach(error => message += `${error}`)
      return message
    }
  }

  };
</script>
<style></style>
