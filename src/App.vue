<template>
  <load-layout v-if="isLoading">
    <page-loading />
  </load-layout>
  <router-view v-else></router-view>
</template>

<script>
import PageLoading from './views/Pages/PageLoading.vue'
import LoadLayout from './views/Layout/LoadLayout.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: { PageLoading, LoadLayout },
  computed: {
    ...mapState('loading', { isLoading: 'isLoading' })
  }
}
</script>
