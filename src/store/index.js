import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import auth from './modules/auth'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    auth,
    error
  }
})
