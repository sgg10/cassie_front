import * as authentication from '../../api/auth'

export default {
  namespaced: true,
  state: {
    access_token: null,
    user: null
  },
  mutations: {
    SET_ACCESS_TOKEN (state, payload) {
      state.access_token = payload
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    refreshToken ({ state, commit }, scoped = false) {
      scoped ? null : commit('loading/SET_LOADING', true, { root: true })
      const token = localStorage.getItem('refresh_token')
      if (token) {
        authentication.refreshToken(token)
          .then(({ data }) => {
            commit('SET_ACCESS_TOKEN', data.access)
            if (!state.user) {
              commit('SET_USER', data.user)
            }
          })
          .catch((err) => {
            commit('SET_ACCESS_TOKEN', null)
            commit('SET_USER', null)
            localStorage.removeItem('refresh_token')
            console.log('❗❗', err)
          })
          .finally(() => {
            scoped ? null : commit('loading/SET_LOADING', false, { root: true })
          })
      } else {
        scoped ? null : commit('loading/SET_LOADING', false, { root: true })
      }
    }
  }
}
