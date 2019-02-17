import state from './app.state'
import mutations from './app.mutations'
import actions from './app.actions'
import getters from './app.getters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
